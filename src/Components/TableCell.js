import React from 'react';
import { Tooltip } from '@material-ui/core';

const TableCell = ({ value }) => {
  const displayValue = typeof value === 'object' ? JSON.stringify(value) : String(value);
  
  return (
    <td className="px-6 py-4 whitespace-nowrap">
      <Tooltip title={displayValue} arrow>
        <div className="text-sm text-gray-900 truncate max-w-xs">
          {displayValue}
        </div>
      </Tooltip>
    </td>
  );
};

export default TableCell;

