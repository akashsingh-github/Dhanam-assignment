import React, {useState, useEffect} from "react";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import axios from "axios";
import Product from "./product";

function PickingDate(){
    const [isChange, setIsChange] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [engAndWales, setEngAndWales] = useState([]);
    const [scotland, setScotland] = useState([]);
    const [northernIreland, setNorthernIreland] = useState([]);

    var res = []

    function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    const handleSelect = (ranges) => {
        setIsChange(true)
        setStartDate(convert(ranges.selection.startDate));
        setEndDate(convert(ranges.selection.endDate));
    }

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    }

    const fetchData = async () => {
        const data = await axios('https://www.gov.uk/bank-holidays.json');
        setEngAndWales(data.data["england-and-wales"].events)
        setScotland(data.data["scotland"].events);
        setNorthernIreland(data.data["northern-ireland"].events);
    }
    engAndWales.map((item) => {
        res.push(item)
    })
    scotland.map((item) => {
        res.push(item)
    })
    northernIreland.map((item) => {
        res.push(item)
    })

    useEffect(() => {
        fetchData();
    }, []);

    const filterDate = res.filter(function(item){
        return (item.date >= startDate && item.date <= endDate);
    });


    const itemMap = filterDate.map((item) => {
        return <Product title={item.title} bunting={item.bunting} notes={item.notes} date={item.date} />
    })

    const resMap = res.map(function(item) {
        return <Product title={item.title} bunting={item.bunting} notes={item.notes} date={item.date} />
    })

    return(

        <>
            <DateRangePicker
                className="date-picker"
                ranges={[selectionRange]}
                onChange={handleSelect}

            />
            {isChange ? <button className="clear-btn" onClick={() => setIsChange(false)}>Clear Filter</button> : null}
            {isChange ? <h1 className="date-range">{startDate} to {endDate}</h1> : null }
            <div className="display-grid">
                { isChange ? itemMap: resMap} 
            </div>
        </>
    )
}
export default PickingDate;