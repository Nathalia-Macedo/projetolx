import React, { useState } from 'react';

const TableCreator = ({ onCreateTable }) => {
  const [headers, setHeaders] = useState(['']);
  const [rows, setRows] = useState([['']]);
  const [tableTitle, setTableTitle] = useState('');

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
    const data = rows.map(row => 
      Object.fromEntries(headers.map((header, index) => [header, row[index]]))
    );
    onCreateTable(tableTitle, headers, data);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                className="mr-2 px-2 py-1 border border-gray-300 rounded-md"
                placeholder="Nome do cabeçalho"
              />
              <button
                type="button"
                onClick={() => removeHeader(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-md"
              >
                ✕
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addHeader}
            className="px-2 py-1 bg-blue-500 text-white rounded-md"
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
                        className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        placeholder={`Valor para ${headers[colIndex] || `Coluna ${colIndex + 1}`}`}
                      />
                    </td>
                  ))}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => removeRow(rowIndex)}
                      className="px-2 py-1 bg-red-500 text-white rounded-md"
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
          className="mt-2 px-2 py-1 bg-green-500 text-white rounded-md"
        >
          + Adicionar Linha
        </button>
      </div>
      <button 
        type="button" 
        onClick={handleCreateTable}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Criar Tabela
      </button>
    </div>
  );
};

export default TableCreator;

