import React, { useState } from 'react';

const TableCreator = ({ onCreateTable, onClose }) => {
  const [tableTitle, setTableTitle] = useState('');
  const [headers, setHeaders] = useState(['']);
  const [rows, setRows] = useState([['']]);

  const addHeader = () => {
    setHeaders([...headers, '']);
    setRows(rows.map(row => [...row, '']));
  };

  const removeHeader = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    const newRows = rows.map(row => row.filter((_, i) => i !== index));
    setHeaders(newHeaders);
    setRows(newRows);
  };

  const updateHeader = (index, value) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const addRow = () => {
    setRows([...rows, new Array(headers.length).fill('')]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const updateCell = (rowIndex, colIndex, value) => {
    const newRows = [...rows];
    newRows[rowIndex][colIndex] = value;
    setRows(newRows);
  };

  const handleCreateTable = () => {
    if (!tableTitle || headers.some(header => !header) || rows.some(row => row.some(cell => !cell))) {
      alert('Por favor, preencha todos os campos antes de criar a tabela.');
      return;
    }
    const data = rows.map(row => 
      Object.fromEntries(headers.map((header, index) => [header, row[index]]))
    );
    onCreateTable(tableTitle, headers, data);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Criar Nova Tabela</h2>
      <div className="mb-4">
        <label htmlFor="tableTitle" className="block text-sm font-medium text-gray-700 mb-2">
          Título da Tabela
        </label>
        <input
          type="text"
          id="tableTitle"
          value={tableTitle}
          onChange={(e) => setTableTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Digite o título da tabela"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="headers" className="block text-sm font-medium text-gray-700 mb-2">
          Cabeçalhos
        </label>
        <div className="flex flex-wrap gap-2">
          {headers.map((header, index) => (
            <div key={index} className="flex items-center">
              <input
                type="text"
                value={header}
                onChange={(e) => updateHeader(index, e.target.value)}
                className="mr-2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nome do cabeçalho"
              />
              <button
                type="button"
                onClick={() => removeHeader(index)}
                className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addHeader}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            + Adicionar Cabeçalho
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="data" className="block text-sm font-medium text-gray-700 mb-2">
          Dados
        </label>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {headers.map((header, index) => (
                  <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {header || `Coluna ${index + 1}`}
                  </th>
                ))}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        value={cell}
                        onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`Valor para ${headers[colIndex] || `Coluna ${colIndex + 1}`}`}
                      />
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => removeRow(rowIndex)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button 
          type="button" 
          onClick={addRow}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          + Adicionar Linha
        </button>
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          type="button" 
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Cancelar
        </button>
        <button 
          type="button" 
          onClick={handleCreateTable}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Criar Tabela
        </button>
      </div>
    </div>
  );
};

export default TableCreator;

