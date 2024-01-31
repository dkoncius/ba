import { useState } from "react";

const ProgressFiltering = ({setIsFiltering}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [fromDate, setFromDate] = useState("");
    const [toData, setToDate] = useState("");
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
  
      switch(name) {
        case "from": setFromDate(value); break;
        case "to": setToDate(value); break;
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      setIsFiltering(false);
    }
  
    return (
      <>
    <p>Rodyti datą:</p>
      <form onSubmit={handleSubmit}>
        <input
              type={isFocused || fromDate ? "date" : "text"}
              name="from"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleInputChange}
              value={fromDate || ""}
              placeholder="Nuo"
              className="date-input"
          />
  
          <input
              type={isFocused || toData ? "date" : "text"}
              name="to"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handleInputChange}
              value={toData || ""}
              placeholder="Iki"
              className="date-input"
          />
      </form>
      </>
    )
  }

  export default ProgressFiltering;