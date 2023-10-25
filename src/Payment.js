import React, { useEffect, useState } from 'react';
import './Payment.css'
import { useStateValue } from './StateProvider';
import { Checkbox } from '@mui/material';
import CheckoutProduct from './CheckoutProduct';
import { Link,useNavigate} from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './Reducer';
import axios from 'axios';

function Payment() {

    const stripe = useStripe();
    const elements = useElements();
    const history = useNavigate()
    const [{ basket, user }, dispatch] = useStateValue();

    const[succeeded,setSucceeded] = useState(false);
    const[processing,setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(()=>{
        const getClientSecreat = async () =>{
            const response = await axios({
                method:'post',
                 url: `http://127.0.0.1:5001/fir-cc88d/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`
            })
            setClientSecret(response.data.clientSecret)
            console.log("hii",getBasketTotal(basket))
        }
        getClientSecreat();
    },[basket])

    // useEffect(() => {
    //     const getClientSecret = async () => {
    //       try {
    //         const response = await axios({
    //           method: 'post',
    //           url: `http://127.0.0.1:5001/fir-cc88d/us-central1/api/payments/create?total=${getBasketTotal(basket) * 100}`
    //         });
    //         console.log("hii",getBasketTotal(basket))
    //         setClientSecret(response.data.clientSecret);
    //       } catch (error) {
    //         // Handle the error, e.g., set an error state or log the error
    //         console.error('Error fetching client secret:', error);
    //       }
    //     };
    //     getClientSecret();
    //   }, [basket]);

    console.log('the secret is',clientSecret)

    const handleSubmit = async(event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret ,{
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
            setSucceeded(true);
            setError(null)
            setProcessing(false)
            history('/orders')
        })

    }
    const handleChange = event => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

    return (
        <div className='payment'>
            <div className='payment_container'>
                <h1>
                    Checkout(
                    <Link to='/checkout'>{basket?.length} items</Link>
                    )
                </h1>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment_address'>
                        <p>{user?.email}</p>
                        <p>1-101 madapur,</p>
                        <p>Hyd, telangana.</p>
                    </div>
                </div>
                <div className='payment_section'>
                    <div className='payment_title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>

                </div>
                <div className='payment_section'>
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className='payment_priceContainer'>
                                <CurrencyFormat
                                    renderText={(value) => (
                                        <>
                                            <h3>Order Total:{value}</h3>
                                        </>
                                    )}
                                    decimalScale={2}
                                    value={(getBasketTotal(basket))}
                                    displayType={"text"}
                                    thousandSeprator={true}
                                    prefix={'$'}
                                />
                                <button
                                    disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>

                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
