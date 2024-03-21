import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const INITIAL_L = 1; // индуктивность
const INITIAL_R = 10; // сопротивление
const INITIAL_E = 5; // ЭДС
function ChartClosingOpening() {
    const [L, setL] = useState(INITIAL_L);
    const [R, setR] = useState(INITIAL_R);
    const [E, setE] = useState(INITIAL_E);

    const [dataClosing, setDataClosing] = useState([]);
    const [dataOpening, setDataOpening] = useState([]);

    const size = 3.28;
    const points = 314;
    const step = size / points;

    useEffect(() => {
        const newDataClosing = Array.from({length: points}, (v, i) => step * i).map(t => {
            // При замыкании
            const I = E / R * Math.exp(-R / L * t);
            return {x: t, y: I};
        });
        setDataClosing(newDataClosing);

        const newDataOpening = Array.from({length: points}, (v, i) => step * i).map(t => {
            // При размыкании
            const I = E / R * (1 - Math.exp(-R / L * t));
            return {x: t, y: I};
        });
        setDataOpening(newDataOpening);

    }, [L, R, E]);

    return (
        <div style={{display: "flex", justifyContent: "space-around", marginLeft: "50px"}}>
            <div>
                <h2>Ввод данных</h2>
                <div>
                    <label>
                        Индуктивность L (Гн):
                        <input type='number' value={L} onChange={(e) => setL(e.target.value < 0 ? 0 : +e.target.value)} min="0" />
                    </label>
                </div>
                <div>
                    <label>
                        Сопротивление R (Ом):
                        <input type='number' value={R} onChange={(e) => setR(e.target.value < 0 ? 0 : +e.target.value)} min="0" />
                    </label>
                </div>
                <div>
                    <label>
                        ЭДС E (В):
                        <input type='number' value={E} onChange={(e) => setE(e.target.value < 0 ? 0 : +e.target.value)} min="0" />
                    </label>
                </div>
            </div>

            <div style={{textAlign: "center"}}>
                <h2>Зависимость тока от времени при замыкании и размыкании цепи</h2>
                <Plot
                    data={[
                        {
                            x: dataClosing.map(o => o.x),
                            y: dataClosing.map(o => o.y),
                            type: 'scatter',
                            mode: 'lines',
                            marker: {color: 'blue'},
                            name: 'Ток при замыкании'
                        },
                    ]}
                    layout={{
                        width: 900,
                        height: 600,
                        xaxis: {title: 'Время (с)'},
                        yaxis: {title: 'Ток (A)'},
                        title: 'График тока при замыкании цепи'
                    }}
                />
                <Plot
                    data={[
                        {
                            x: dataOpening.map(o => o.x),
                            y: dataOpening.map(o => o.y),
                            type: 'scatter',
                            mode: 'lines',
                            marker: {color: 'red'},
                            name: 'Ток при размыкании'
                        },
                    ]}
                    layout={{
                        width: 900,
                        height: 600,
                        xaxis: {title: 'Время (с)'},
                        yaxis: {title: 'Ток (A)'},
                        title: 'График тока при размыкании цепи'
                    }}
                />
            </div>
        </div>

    );
}

export default ChartClosingOpening;