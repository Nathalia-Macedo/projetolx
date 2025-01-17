import React from 'react';
import { DownloadIcon } from '@heroicons/react/solid';
import { useTableContext } from '../Context/TableContext';
const ExportButton = () => {
  const { data, visibleColumns, columns } = useTableContext();

  const exportToCSV = () => {
    const visibleData = data.map(row =>
      visibleColumns.reduce((acc, key) => {
        acc[key] = row[key];
        return acc;
      }, {})
    );

    const headers = visibleColumns.map(key => columns.find(col => col.key === key).label);
    const csvContent = [
      headers.join(','),
      ...visibleData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <button
      onClick={exportToCSV}
      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <DownloadIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
      Exportar CSV
    </button>
  );
};

export default ExportButton;

