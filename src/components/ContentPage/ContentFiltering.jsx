import { useState } from "react";

const ContentFiltering = ({setIsFiltering}) => {
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
        <h2>Filtras</h2>
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
          <button className="button-green">Išsaugoti</button>
      </form>
      </>
    )
  }

  export default ContentFiltering;