import { useState, useEffect } from "react";

const ProgressFiltering = ({ setIsFiltering, onDateChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    // Use state to manage date inputs for filtering
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    // Set initial date range to the last 30 days on component mount
    useEffect(() => {
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const formatDate = (date) => date.toISOString().split('T')[0];

        setFromDate(formatDate(last30Days));
        setToDate(formatDate(today));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "from") {
            setFromDate(value);
        } else if (name === "to") {
            setToDate(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onDateChange({ fromDate, toDate });
        setIsFiltering(true); // Signal that filtering is in effect (might need to adjust based on actual logic)
    };

    return (
        <>
            <p className="show-date">Rodyti datą:</p>
            <form onSubmit={handleSubmit}>
              <div className="inputs">
                <input
                    type="date"
                    name="from"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleInputChange}
                    value={fromDate}
                    className="date-input"
                />
                <input
                    type="date"
                    name="to"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={handleInputChange}
                    value={toDate}
                    className="date-input"
                />
              </div>

              <button className="button-green" type="submit">Filter</button>
            </form>
        </>
    );
};

export default ProgressFiltering;
