import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import './App.css';

const AgeDistributionChart = () => {
  // Data fra Excel-filen (alder er i kolonne D)
  const ages = [
    7, 9, 11, 8, 10, 6, 12, 7, 9, 11, 8, 10, 6, 12, // Opprinnelige 14
    7, 10, 12, 6, 10, 11, 12, 9, 10, 6, 9, 11, 9, 7, 10, 12, 9, 12, 6, 9 // Nye 20
  ];

  // Beregn aldersfordeling
  const ageDistribution = {};
  ages.forEach(age => {
    ageDistribution[age] = (ageDistribution[age] || 0) + 1;
  });

  // Konverter til format for chart
  const chartData = Object.keys(ageDistribution)
    .sort((a, b) => parseInt(a) - parseInt(b))
    .map(age => ({
      alder: `${age} år`,
      antall: ageDistribution[age],
      alderNumerisk: parseInt(age)
    }));

  // Beregn gjennomsnittsalder
  const averageAge = ages.reduce((sum, age) => sum + age, 0) / ages.length;
  const roundedAverage = Math.round(averageAge * 100) / 100;

  const totalPeople = ages.length;

  return (
    <div className="App">
      <div style={{ width: '100%', padding: '24px', backgroundColor: '#f9fafb' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#1f2937' }}>
            Aldersfordeling i Datasettet
          </h2>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <p style={{ fontSize: '18px', color: '#6b7280' }}>
              <span style={{ fontWeight: '600' }}>Total: {totalPeople} personer</span>
            </p>
            <p style={{ fontSize: '18px', fontWeight: '600', color: '#3b82f6' }}>
              Gjennomsnittsalder: {roundedAverage} år
            </p>
          </div>
          
          <div style={{ height: '400px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis 
                  dataKey="alder" 
                  tick={{ fontSize: 12, fill: '#374151' }}
                  axisLine={{ stroke: '#6b7280' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#374151' }}
                  axisLine={{ stroke: '#6b7280' }}
                  label={{ value: 'Antall personer', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#374151' } }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value, name) => [value, 'Antall personer']}
                  labelFormatter={(label) => `Alder: ${label}`}
                />
                <Bar 
                  dataKey="antall" 
                  fill="#3b82f6"
                  stroke="#2563eb"
                  strokeWidth={1}
                  radius={[4, 4, 0, 0]}
                />
                <ReferenceLine 
                  x={`${Math.round(averageAge)} år`} 
                  stroke="#ef4444" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  label={{ 
                    value: `Gjennomsnitt: ${roundedAverage} år`, 
                    position: 'top',
                    fill: '#ef4444',
                    fontSize: 12,
                    fontWeight: 'bold'
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', fontSize: '14px' }}>
            {chartData.map(item => (
              <div key={item.alder} style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontWeight: '600', color: '#1e40af' }}>{item.alder}</div>
                <div style={{ color: '#2563eb' }}>{item.antall} personer</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {Math.round((item.antall / totalPeople) * 100)}%
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
            <p>Den røde stiplete linjen viser gjennomsnittsalderen ({roundedAverage} år)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return <AgeDistributionChart />;
}

export default App;