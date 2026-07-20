const DataTable = ({
  columns,
  data,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-slate-50">
            {columns.map((column) => (
              <th
                key={column.key}
                className="text-left p-4"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-t hover:bg-slate-50"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="p-4"
                >
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;