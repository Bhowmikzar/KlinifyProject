import React, { useMemo } from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import patient from "./patient.json";
import { COLUMNS } from "./columns";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./styles.css";

export const Table = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => patient, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data
    },
    useFilters,
    useSortBy
  );

  const handleDragEnd = (results) => {
    let tempuser = [...data];
    let slectedRow = tempuser.splic(results.source.index, 1);
    tempuser.splice(results.destination.index, 0, slectedRow);
  };

  return (
    <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                  <span>
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <Droppable droppableId="tbody">
          {(provided) => (
            <tbody
              ref={provided.innerRef}
              {...provided.droppableProps}
              {...getTableBodyProps()}
            >
              {provided.placeholder}

              {rows.map((row, index) => {
                prepareRow(row);
                return (
                  <Draggable key={index} draggableId={row.id} index={index}>
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        {...row.getRowProps()}
                      >
                        {row.cells.map((cell) => {
                          return (
                            <td {...cell.getCellProps()}>
                              {" "}
                              {cell.render("Cell")}{" "}
                            </td>
                          );
                        })}
                      </tr>
                    )}
                  </Draggable>
                );
              })}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};
