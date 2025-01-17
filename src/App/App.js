// import React, { useState } from 'react';
// import AdvancedDataTable from '../Components/AdvancedDataTable';

// const employeesData = [
//   { id: 1, nome: 'João Silva', cargo: 'Desenvolvedor', departamento: 'TI', salario: 5000 },
//   { id: 2, nome: 'Maria Santos', cargo: 'Designer', departamento: 'Marketing', salario: 4500 },
//   { id: 3, nome: 'Pedro Oliveira', cargo: 'Gerente', departamento: 'Vendas', salario: 7000 },
//   { id: 4, nome: 'Ana Rodrigues', cargo: 'Analista', departamento: 'Financeiro', salario: 4800 },
//   { id: 5, nome: 'Carlos Ferreira', cargo: 'Desenvolvedor', departamento: 'TI', salario: 5200 },
//   { id: 6, nome: 'Juliana Lima', cargo: 'RH', departamento: 'Recursos Humanos', salario: 4300 },
//   { id: 7, nome: 'Roberto Alves', cargo: 'Vendedor', departamento: 'Vendas', salario: 3800 },
//   { id: 8, nome: 'Fernanda Costa', cargo: 'Contadora', departamento: 'Financeiro', salario: 5500 },
//   { id: 9, nome: 'Marcelo Santos', cargo: 'Suporte', departamento: 'TI', salario: 4000 },
//   { id: 10, nome: 'Camila Oliveira', cargo: 'Marketing', departamento: 'Marketing', salario: 4700 },
//   { id: 11, nome: 'Lucas Mendes', cargo: 'Desenvolvedor', departamento: 'TI', salario: 5100 },
//   { id: 12, nome: 'Beatriz Sousa', cargo: 'Analista', departamento: 'Financeiro', salario: 4900 },
// ];

// const productsData = [
//   { id: 1, nome: 'Laptop', categoria: 'Eletrônicos', preco: 3500, estoque: 50 },
//   { id: 2, nome: 'Smartphone', categoria: 'Eletrônicos', preco: 2000, estoque: 100 },
//   { id: 3, nome: 'Cadeira de Escritório', categoria: 'Móveis', preco: 500, estoque: 30 },
//   { id: 4, nome: 'Monitor', categoria: 'Eletrônicos', preco: 800, estoque: 40 },
//   { id: 5, nome: 'Teclado', categoria: 'Acessórios', preco: 150, estoque: 80 },
//   { id: 6, nome: 'Mouse', categoria: 'Acessórios', preco: 100, estoque: 120 },
//   { id: 7, nome: 'Impressora', categoria: 'Eletrônicos', preco: 600, estoque: 25 },
//   { id: 8, nome: 'Mesa de Escritório', categoria: 'Móveis', preco: 700, estoque: 20 },
//   { id: 9, nome: 'Fones de Ouvido', categoria: 'Acessórios', preco: 200, estoque: 60 },
//   { id: 10, nome: 'Webcam', categoria: 'Eletrônicos', preco: 250, estoque: 35 },
//   { id: 11, nome: 'Pen Drive', categoria: 'Acessórios', preco: 50, estoque: 150 },
//   { id: 12, nome: 'Roteador', categoria: 'Eletrônicos', preco: 180, estoque: 45 },
// ];

// const employeesColumns = [
//   { key: 'id', label: 'ID' },
//   { key: 'nome', label: 'Nome' },
//   { key: 'cargo', label: 'Cargo' },
//   { key: 'departamento', label: 'Departamento' },
//   { key: 'salario', label: 'Salário' },
// ];

// const productsColumns = [
//   { key: 'id', label: 'ID' },
//   { key: 'nome', label: 'Nome' },
//   { key: 'categoria', label: 'Categoria' },
//   { key: 'preco', label: 'Preço' },
//   { key: 'estoque', label: 'Estoque' },
// ];

// function App() {
//   const [tableType, setTableType] = useState('employees');

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 flex flex-col">
//       <div className="max-w-7xl mx-auto w-full">
//         <div className="bg-white shadow-lg rounded-lg overflow-hidden flex-grow flex flex-col">
//           <div className="p-4 border-b border-gray-200">
//             <div className="flex justify-between items-center">
//               <h1 className="text-2xl font-semibold text-gray-800">Tabela de Dados Avançada</h1>
//               <div className="flex space-x-4">
//                 <button
//                   className={`px-4 py-2 text-sm font-medium rounded-md ${
//                     tableType === 'employees'
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                   onClick={() => setTableType('employees')}
//                 >
//                   Funcionários
//                 </button>
//                 <button
//                   className={`px-4 py-2 text-sm font-medium rounded-md ${
//                     tableType === 'products'
//                       ? 'bg-blue-500 text-white'
//                       : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//                   }`}
//                   onClick={() => setTableType('products')}
//                 >
//                   Produtos
//                 </button>
//               </div>
//             </div>
//           </div>
//           <AdvancedDataTable
//             initialData={tableType === 'employees' ? employeesData : productsData}
//             initialColumns={tableType === 'employees' ? employeesColumns : productsColumns}
//             tableType={tableType}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import TableManager from '../Components/TableManager';
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TableManager />
    </div>
  );
}

export default App;

