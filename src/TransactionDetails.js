import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./Achievement.css";

const TransactionDetails = () => {
    const { type_id } = useParams();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const storedId = localStorage.getItem('user_id');

    useEffect(() => {
        fetchTransactionDetails();
    }, []);

    const fetchTransactionDetails = async () => {
        try {
            // console.log(storedId);
            const response = await axios.post(
                'https://mrcartonline.com/kitty/index.php/User/get_all_transaction',
                { user_id: storedId, type_id },
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                }
            );
            if (response.data?.status) {
                setTransactions(response.data.data);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error("Error fetching transaction details", error);
        }
    };

    return (
        <div className='container'>
            <div className="row fixedbg shadow pb-1">
                <div className="col-1" onClick={() => navigate(-1)}>
                    <h5><i className="fa-solid fa-arrow-left" style={{ cursor: 'pointer' }}></i></h5>
                </div>
                <div className="col-10">Transaction Details</div>
            </div>

            <div className='row mt-5 pt-2'>
                {transactions.length > 0 ? (
                    transactions.map((transaction, i) => (
                        <div className='col-12' key={i}>
                            <div className="border m-1 py-2 rounded-3 shadow row justify-content-center mb-2">
                               <div className='col-6 col-md-4'>
                               <div className='level-text'>Level: {transaction.level}</div>
                               {transaction.credit_amt === "0" ?(
                                <div className='debit-text'>&#8377;{transaction.debit_amt}</div>
                               ):(
                                <div className='credit-text'>+&#8377;{transaction.credit_amt}</div>
                               ) }
                               </div>
                               <div className='col-6 col-md-4 text-end'>
                               <div className='date-text'>{transaction.date_time}</div>
                               </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No transactions found</p>
                )}
            </div>
        </div>
    );
};

export default TransactionDetails;
