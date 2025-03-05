import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./profile.css";

const Transaction = () => {
    const navigate = useNavigate();
    const [transTypes, setTransTypes] = useState([]);
    // const [transDetails, setTransDetails] = useState({}); 
    // const [openIndex, setOpenIndex] = useState(null);
    // const storedId = '10001';

 
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('https://mrcartonline.com/kitty/index.php/User/getTransTypes');
            if (response.data?.status) {
                setTransTypes(response.data.data);
            } else {
                console.log("No transaction types found");
            }
        } catch (error) {
            console.error("Error fetching transaction types", error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

  
    // Toggle Collapse and Fetch Data
    // const toggleCollapse = (index, type_id) => {
    //     if (openIndex === index) {
    //         setOpenIndex(null);
    //     } else {
    //         setOpenIndex(index);
    //         if (!transDetails[type_id]) {
    //             fetchDetails(type_id); // Fetch only if not already fetched
    //         }
    //     }
    // };

    return (
        <div className='container-fluid'>
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left" style={{ cursor: 'pointer' }}></i></h5>
                </div>
                <div className="col-10">All Transactions</div>
            </div>

            {/* <div className='row mt-5 pt-2'>
                {transTypes.map((type, index) => (
                    <div key={index} className="col-12 col-md-6">
                        <div className="card border-0 pb-1 pb-md-2">
                            <div className="card-header">
                                <div className="trans-text" onClick={() => toggleCollapse(index, type.id)} style={{ cursor: 'pointer' }}>
                                    {type.type_nname}
                                </div>
                            </div>
                            {openIndex === index && (
                                <div className="collapse show">
                                    <div className="card-body">
                                        {transDetails[type.id] && transDetails[type.id].length > 0 ? (
                                            transDetails[type.id].map((transaction, i) => (
                                                <div className='row' key={i}>
                                                    <div className='col-12'>
                                                        <strong>Level: {transaction.level}</strong>
                                                    </div>
                                                    <div className='col-12'>
                                                        <strong>Previous Balance: {transaction.pre_balance}</strong>
                                                    </div>
                                                    <div className='col-12'>
                                                        <strong>Credit Amount: {transaction.credit_amt}</strong>
                                                    </div>
                                                    <div className='col-12'>
                                                        <strong>Debit Amount: {transaction.debit_amt}</strong>
                                                    </div>
                                                    <div className='col-12'>
                                                        <strong>Total Amount: {transaction.amount}</strong>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No transactions found</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div> */}

<div className='row mt-5 pt-2'>
        {transTypes.map((type, index) => (
            <div key={index} className="col-12 col-md-6">
                <div className="card border-0 pb-1 pb-md-2">
                    <div 
                        className="card-header" 
                        onClick={() => navigate(`/transaction-details/${type.type_id}`)} 
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="trans-text">
                            {type.type_nname}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
        </div>
    );
};

export default Transaction;
