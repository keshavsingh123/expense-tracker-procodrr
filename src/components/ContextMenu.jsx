import React from "react";

const ContextMenu = ({
  menuPosition,
  setMenuPosition,
  setExpenses,
  rowId,
  setExpense,
  expenses,
  setEditingRowId
}) => {
  if (!menuPosition.left) return;
  return (
    <div className="context-menu" style={{ ...menuPosition }}>
      <div
        onClick={() => {
        const {title,category,amount} = expenses.find((expense)=>expense.id === rowId)
        setEditingRowId(rowId)
          setExpense({title,category,amount});
          setMenuPosition({});
        }}
      >
        Edit
      </div>
      <div
        onClick={() => {
          console.log("Deleting");
          setMenuPosition({});
          setExpenses((prevState) =>
            prevState.filter((expense) => expense.id !== rowId)
          );
        }}
      >
        Delete
      </div>
    </div>
  );
};

export default ContextMenu;
