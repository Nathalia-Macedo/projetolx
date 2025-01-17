import React, { useState } from 'react';
import { useTableContext } from '../Context/TableContext';
import { ChatAltIcon } from '@heroicons/react/solid';

const ChatGPTHelper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const { data, columns } = useTableContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically make an API call to your ChatGPT endpoint
    // For this example, we'll just simulate a response
    const simulatedResponse = `Com base nos dados da tabela, aqui está o que posso dizer sobre "${query}":

1. A tabela contém ${data.length} linhas e ${columns.length} colunas.
2. As colunas são: ${columns.map(col => col.label).join(', ')}.
3. Para obter insights mais específicos, tente perguntar sobre colunas ou intervalos de dados específicos.`;

    setResponse(simulatedResponse);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ChatAltIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
        Perguntar ao ChatGPT
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 sm:text-sm"
                placeholder="Faça uma pergunta sobre os dados"
              />
              <button
                type="submit"
                className="mt-2 w-full inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar
              </button>
            </form>
            {response && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{response}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatGPTHelper;

