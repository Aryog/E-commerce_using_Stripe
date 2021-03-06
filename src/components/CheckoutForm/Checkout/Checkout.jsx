import React,{useState,useEffect} from 'react'
import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from '@material-ui/core'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import useStyles from './style'
import { commerce } from '../../../lib/commerce'
import {Link} from 'react-router-dom'
const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const steps =['Shipping address','Payment details'];
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({});
    useEffect(() => {
        const generateToken = async()=>
        {
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type:'cart'});
                console.log(token);
                setCheckoutToken(token);
            } catch (error) {
                
            }
        }
        generateToken();
    }, [cart]);
    const nextStep=()=>setActiveStep((prevActiveState)=>prevActiveState+1);
    const backStep=()=>setActiveStep((prevActiveState)=>prevActiveState-1);

    const next =(data)=>{
        setShippingData(data);
        console.log('this is next button click');
        nextStep();
    }
    const classes = useStyles();
    const Form =()=>(activeStep===0?<AddressForm checkoutToken={checkoutToken} next={next}/>:<PaymentForm onCaptureCheckout={onCaptureCheckout} nextStep={nextStep} shippingData={shippingData} backStep={backStep} checkoutToken={checkoutToken}/>)


    let Confirmation = () => (order.customer ? (
        <>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </>
        );
      }
    


    return (
        <>
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                               <Step key={step}>
                                   <StepLabel>{step}</StepLabel>
                               </Step>
                        ))}
                    </Stepper>
                {activeStep===steps.length ? <Confirmation/>:checkoutToken && <Form/>}
                </Paper>
            </main>
        </>
    )
}

export default Checkout;
