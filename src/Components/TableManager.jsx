import React, { useState } from 'react';
import AdvancedDataTable from './AdvancedDataTable';
import TableCreator from './TableCreator';

const generateEmployeesData = () => {
  const departments = ['TI', 'Marketing', 'Vendas', 'Financeiro', 'RH', 'Operações', 'Jurídico', 'Produto'];
  const positions = ['Desenvolvedor', 'Designer', 'Gerente', 'Analista', 'Coordenador', 'Assistente', 'Diretor', 'Estagiário'];
  const names = [
    'João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Mariana', 'José', 'Fernanda', 'Paulo', 'Beatriz',
    'Lucas', 'Camila', 'Rafael', 'Juliana', 'Fernando', 'Larissa', 'Gustavo', 'Amanda', 'Ricardo', 'Patrícia'
  ];
  const surnames = [
    'Silva', 'Santos', 'Oliveira', 'Rodrigues', 'Ferreira', 'Almeida', 'Pereira', 'Lima', 'Gomes', 'Ribeiro',
    'Martins', 'Carvalho', 'Fernandes', 'Vieira', 'Souza', 'Costa', 'Barbosa', 'Rocha', 'Dias', 'Cardoso'
  ];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    nome: `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`,
    cargo: positions[Math.floor(Math.random() * positions.length)],
    departamento: departments[Math.floor(Math.random() * departments.length)],
    salario: Math.floor(Math.random() * (10000 - 2000 + 1) + 2000)
  }));
};

const generateProductsData = () => {
  const categories = ['Eletrônicos', 'Móveis', 'Acessórios', 'Vestuário', 'Livros', 'Esportes', 'Beleza', 'Casa e Decoração'];
  const productNames = [
    'Laptop', 'Smartphone', 'Cadeira de Escritório', 'Monitor', 'Teclado', 'Mouse', 'Headphone', 'Webcam',
    'Impressora', 'Roteador', 'Pen Drive', 'HD Externo', 'Carregador Portátil', 'Caixa de Som', 'Smartwatch',
    'Tablet', 'E-reader', 'Câmera Digital', 'Tripé', 'Mochila para Notebook', 'Suporte para Monitor', 'Mesa',
    'Poltrona', 'Luminária', 'Ventilador', 'Ar Condicionado Portátil', 'Purificador de Ar', 'Cafeteira',
    'Garrafa Térmica', 'Organizador de Cabos', 'Suporte para Celular', 'Mousepad', 'Hub USB', 'Adaptador HDMI',
    'Cabo de Rede', 'Filtro de Linha', 'Estabilizador', 'No-break', 'Projetor', 'Tela de Projeção', 'Quadro Branco',
    'Flipchart', 'Fragmentadora de Papel', 'Encadernadora', 'Plastificadora', 'Scanner', 'Leitor de Código de Barras',
    'Telefone IP', 'Fone de Ouvido com Microfone'
  ];

  return Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    nome: productNames[index],
    categoria: categories[Math.floor(Math.random() * categories.length)],
    preco: Math.floor(Math.random() * (5000 - 50 + 1) + 50),
    estoque: Math.floor(Math.random() * (200 - 10 + 1) + 10)
  }));
};

const TableManager = () => {
  const [tables, setTables] = useState([
    {
      id: 'employees',
      title: 'Funcionários',
      data: generateEmployeesData(),
      columns: [
        { key: 'nome', label: 'Nome' },
        { key: 'cargo', label: 'Cargo' },
        { key: 'departamento', label: 'Departamento' },
        { key: 'salario', label: 'Salário' },
      ]
    },
    {
      id: 'products',
      title: 'Produtos',
      data: generateProductsData(),
      columns: [
        { key: 'nome', label: 'Nome' },
        { key: 'categoria', label: 'Categoria' },
        { key: 'preco', label: 'Preço' },
        { key: 'estoque', label: 'Estoque' },
      ]
    }
  ]);
  const [currentTableId, setCurrentTableId] = useState('employees');
  const [showTableCreator, setShowTableCreator] = useState(false);

  const handleCreateTable = (title, headers, data) => {
    const newTableId = `table-${Date.now()}`;
    const newTable = {
      id: newTableId,
      title: title,
      data: data,
      columns: headers.map(header => ({ key: header, label: header }))
    };
    setTables(prevTables => [...prevTables, newTable]);
    setCurrentTableId(newTableId);
    setShowTableCreator(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Gerenciador de Tabelas
          </h1>
          <button
            onClick={() => setShowTableCreator(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            + Nova Tabela
          </button>
        </div>

        <AdvancedDataTable
          tables={tables}
          currentTableId={currentTableId}
          onTableSelect={setCurrentTableId}
        />

        {showTableCreator && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-10 mx-auto p-5 border w-3/4 max-w-4xl shadow-lg rounded-md bg-white">
              <TableCreator onCreateTable={handleCreateTable} />
              <div className="mt-3 text-center">
                <button
                  onClick={() => setShowTableCreator(false)}
                  className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableManager;

