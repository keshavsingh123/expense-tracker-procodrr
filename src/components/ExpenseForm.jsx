import React, { useRef, useState } from "react";
import Input from "./Input";
import Select from "./Select";

function ExpenseForm({ setExpenses, setExpense, expense, editingRowId,setEditingRowId }) {
  // const [title, setTitile] = useState("");
  // const [category, setCategory] = useState("");
  // const [amount, setAmount] = useState("");
  //2nd way to use state (I have written in app.jsx parent)
  // const [expense, setExpense] = useState({
  //   title: "",
  //   category: "",
  //   amount: "",
  // });

  // const titleRef = useRef();
  // const categoryRef = useRef();
  // const amountRef = useRef();

  const [error, setError] = useState("");

  const validationConfig = {
    title: [
      { required: true, message: "Please Enter Title" },
      { minLength: 5, message: "Title should be at least 5 chars long" },
    ],
    category: [{ required: true, message: "Please Enter Category" }],
    amount: [{ required: true, message: "Please Enter Amount" },
      {
        pattern:/^(0|[1-9]\d*)?(\.\d+)?(?<=\d)$/,
        message: "Please Enter Valid Number"
      }
    ],
  };

  const validate = (formData) => {
    console.log(formData);
    const errorData = {};

    Object.entries(formData).forEach(([key, value]) => {
      validationConfig[key].forEach((rule) => {
        console.log(rule);
        if (rule.required && !value) {
          errorData[key] = rule.message;
        }
        if (rule.minLength && value.length < 5) {
          errorData[key] = rule.message;
        }
      });
    });
    setError(errorData);
    return errorData;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateData = validate(expense);
    console.log(validate);

    if (Object.keys(validateData).length) return;

    if(editingRowId){
      setExpenses((prevState)=>{
        return prevState.map((prevExpense)=>{
          if(prevExpense.id === editingRowId){
            return {...expense,id:editingRowId}
          }
          return prevExpense
        })
      })
      setExpense({
        title: "",
        category: "",
        amount: "",
      });
      setEditingRowId('')
    }

    //2nd way to add data
    setExpenses((prevState) => [
      ...prevState,
      { ...expense, id: crypto.randomUUID() },
    ]);

    
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prevState) => ({ ...prevState, [name]: value }));
    setError({});
  };
  //Third 3rd way

  // setExpenses((prevState) => [
  //   ...prevState,
  //   {
  //     title: titleRef.current.value,
  //     category: categoryRef.current.value,
  //     amount: amountRef.current.value,
  //     id: crypto.randomUUID(),
  //   },
  // ]);
  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={expense.title}
        error={error.title}
        onChange={handleChange}
      />
      <Select
        label="Category"
        id="category"
        name="category"
        value={expense.category}
        error={error.category}
        onChange={handleChange}
        options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
        defaultOpt="Select Category"
      />
      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={expense.amount}
        error={error.amount}
        onChange={handleChange}
      />

      <button className="add-btn">{editingRowId ? "save" : "Add"}</button>
    </form>
  );
}

export default ExpenseForm;
