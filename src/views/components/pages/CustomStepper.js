// /*---------------------------------------------------------- My Code 1 ------------------------------------------------------------------------*/

// import React, { useState, useEffect } from 'react';
// import { Grid, Button, styled, Divider, Typography, Tooltip} from '@mui/material';
// import { Box, positions } from '@mui/system';
// // import Swal from "sweetalert2";
// import Confetti from "react-confetti";
// import { useTheme } from '@emotion/react';
// import SettledImg from "../../../assets/images/settled.jpg";


// export default function CustomStepper({ account }) {
//     // console.log("Account:", account);
//     // const[stage, setStage] = useState(account.stage);
//     const [stage, setStage] = useState(account.stage || 0);
//     const theme = useTheme();
//     const [showConfetti, setShowConfetti] = useState(false);
//     const [confettiDuration, setConfettiDuration] = useState(1000);
//     const StepMain = styled(Box)(({ theme }) => ({
//         position: 'relative',
//         width: '100%'
//     }));

//     useEffect(() => {
//         // Update stage whenever account.stage changes
//         setStage(account.stage || 0);
//         // console.log("CustomStepper received account:", account);
//     }, [account]);
    
//     function getStage(stepperStage){
        
//         if(stepperStage <= parseInt(stage)){
//            return 'active';
//            console.log(typeof(stage))
//         }
//         console.log(stage);
        
//     }
//     const StepsWrap = styled(Box)(({ theme }) => ({
//         position: 'relative',
//         width: '420px',
//         height: '450px',
//         margin: 'auto',
//         marginTop:'140px',
//     }));
//     const Steps = styled(Button)(({ theme }) => ({
//         position: 'absolute',
//         minWidth: 'inherit',
//         width: '40px',
//         height: '40px',
//         borderRadius: '50%',
//         padding: 0,
//         '&:active': {
//             '.tooltipStep' : {
//                 opacity: '1',
//                 visibility: 'visible',

//             }
//         },
//         '&.active': {
// 			'.circle': {
//                 backgroundColor: theme.palette.primary.main,
//                 color: 'white'
//             },
//             '.stepText': {
//                 backgroundColor: theme.palette.primary.extraLight,
//                 color: theme.palette.primary.main
//             },
//             '.tooltipStep': {
//                 backgroundColor: theme.palette.primary.main,
//                 color: 'white'
//             },
//             '.tooltipLine': {
//                 backgroundColor: theme.palette.primary.main
//             }
// 		}
//     }));
//     const Circle = styled(Box)(({ theme }) => ({
//         backgroundColor: '#DBDCDE',
//         borderColor: '#DBDCDE',
//         color: theme.palette.primary.main,
//         width: '100%',
//         height: '100%',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         fontWeight: '600',
//         textTransform: 'uppercase',
//         letterSpacing: '0.5px',
//         borderRadius: '50%',
//         zIndex: '99',
//         position: 'relative'
//     }));
//     const LineWrapper = styled(Box)(({ theme }) => ({    
//         width: '55%',    
//         position: 'absolute'
//     }));
//     const Line = styled(Divider)(({ theme }) => ({
//         width: '100%',
//         borderColor: '#DBDCDE',
//         borderWidth: '3px',
//         '&.active': {
//             borderColor: theme.palette.primary.main
//         }
//     }));
//     const TooltipStep = styled(Box)(({ theme }) => ({
//         width: '150px',
//         height: '100px',
//         backgroundColor: '#DBDCDE',
//         color: '#183D72',
//         padding: '10px',
//         borderRadius: '7px',
//         fontWeight: 600,
//         display:'flex',
//         alignItems:'center',
//         justifyContent:'center', 
//         textAlign: 'center',
//         position: 'absolute',
//         transform: 'translate(3px, 10px)',
//         transition: 'all 0.4s ease',
//         zIndex: 99
//     }));
//     const Tooltipline = styled(Box)(({ theme }) => ({
//         position: 'absolute',
//         display: 'flex',
//         width: '15px',
//         height: '4px',
//         transform: 'rotate(90deg)',
//         left: 'calc(50% - 10px)',
//         bottom: '-8px',
//         backgroundColor: '#DBDCDE',
//     }));
//     const handleStepClick = stepNumber => {
//         if (stepNumber === 9) {
//             setShowConfetti(true);
//             Swal.fire({
//                 title: 'Congratulations!',
//                 text: 'You are at the final stage!',
//                 icon: 'success',
//                 confirmButtonText: 'OK'
//             });
//             setTimeout(() => {
//                 setShowConfetti(false);
//             }, confettiDuration);
//         }
//     };

    


//     return (
//         <Box>
//             {/* <StepMain>
//                 <StepsWrap>
//                     <Steps className={getStage(4)}>
//                         <Circle className="circle">1</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Findings Shared – Awaiting Contract</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps>
//                     <Steps className={getStage(4)} style={{ left: '0', right: '0', margin: 'auto' }}>
//                         <Circle className="circle">2</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2"  fontSize='12px'>Disputes Raised – Submitted</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps className={getStage(4)} style={{ right: '0' }}>
//                         <Circle className="circle">3</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2"  fontSize='12px'>Outstanding Balance Shared by Amazon – Open Bal. Confirmed</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps>
//                     <Steps className={getStage(4)} style={{ right: '0', top: 'calc(50% - 20px)' }}>
//                         <Circle className="circle">4</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Offer Received – File not received</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps style={{ left: '0', right: '0', top: 'calc(50% - 20px)', margin: 'auto' }}>
//                         <Circle className="circle">5</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Settlement Offer Received from Amazon – Offer Shared with Customer</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps style={{ left: '0', top: 'calc(50% - 20px)' }}>
//                         <Circle className="circle">6</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Counteroffer Presented to Amazon – Counteroffer Submitted</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps style={{ bottom: '0' }}>
//                         <Circle className="circle">7</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2"fontSize='12px'>Revised Settlement Offer from Amazon – Revised Offer Shared with Customer</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps style={{ left: '0', right: '0', bottom: '0', margin: 'auto' }}>
//                         <Circle className="circle">8</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Final Settlement Accepted – Settlement Accepted</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps>
//                     <Steps style={{ right: '0', bottom: '0' }}>
//                         <Circle style={{ zIndex: '999' }}><img width="50" src={SettledImg} alt='Settled' onClick={() => handleStepClick(9)}/></Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '60px' }}>
//                             <Typography variant="body2" fontSize='12px'>Amount credited to VC account – WINNNNNN</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps>
//                     <Box>
//                         <LineWrapper style={{ left: '0', top: '20px'}}><Line className={getStage(4)}></Line></LineWrapper>
//                         <LineWrapper style={{ right: '0', top: '20px'}}><Line className={getStage(4)}></Line></LineWrapper>
//                         <LineWrapper style={{ right: '-49px', top: '25%', transform: 'translate(48px) rotate(90deg)'}}><Line className={getStage(4)}></Line></LineWrapper>
//                         <LineWrapper style={{ left: '0', top: 'calc(50% - 2px)'}}><Line></Line></LineWrapper>
//                         <LineWrapper style={{ right: '0', top: 'calc(50% - 2px)'}}><Line></Line></LineWrapper>
//                         <LineWrapper style={{ left: '-34px', top: '70%', transform: 'translate(-60px) rotate(90deg)'}}><Line></Line></LineWrapper>
//                         <LineWrapper style={{ left: '0', bottom: '20px'}}><Line></Line></LineWrapper>
//                         <LineWrapper style={{ right: '0', bottom: '20px'}}><Line></Line></LineWrapper>
//                     </Box>
//                 </StepsWrap>
//                 {showConfetti && ( <Confetti   width={window.innerWidth} height={window.innerHeight} recycle={false} /> )}
//             </StepMain> */}
//             {/* use if elese condition for checking step 8 or 9 for admin account and other account  */}
//             <StepMain>
//                 <StepsWrap>
//                     <Steps className={getStage(1)}>
//                         <Circle className="circle">1</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Findings Shared – Awaiting Contract</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps>
//                     <Steps className={getStage(2)} style={{ left: '0', right: '0', margin: 'auto' }}>
//                         <Circle className="circle">2</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2"  fontSize='12px'>Disputes Raised – Submitted</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps className={getStage(3)} style={{ right: '0' }}>
//                         <Circle className="circle">3</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2"  fontSize='12px'>Outstanding Balance Shared by Amazon – Open Bal. Confirmed</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps>
//                     <Steps className={getStage(4)} style={{ right: '0', top: 'calc(50% - 20px)' }}>
//                         <Circle className="circle">4</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Settlement Offer Received from Amazon – Offer Shared with Custome</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps className={getStage(5)} style={{ left: '0', right: '0', top: 'calc(50% - 20px)', margin: 'auto' }}>
//                         <Circle className="circle">5</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Counteroffer Presented to Amazon – Counteroffer Submitted</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps className={getStage(6)} style={{ left: '0', top: 'calc(50% - 20px)' }}>
//                         <Circle className="circle">6</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'> Revised Settlement Offer from Amazon – Revised Offer Shared with Customer</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     <Steps className={getStage(7)} style={{ bottom: '0' }}>
//                         <Circle className="circle">7</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2"fontSize='12px'>Final Settlement Accepted – Settlement Accepted</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>    
//                     </Steps>
//                     {/* <Steps style={{ left: '0', right: '0', bottom: '0', margin: 'auto' }}>
//                         <Circle className="circle">8</Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
//                             <Typography variant="body2" fontSize='12px'>Final Settlement Accepted – Settlement Accepted</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps> */}
//                     <Steps className={getStage(8)} style={{ left: '0', right: '0', bottom: '0', margin: 'auto' }}>
//                         <Circle style={{ zIndex: '999' }}><img width="50" src={SettledImg} alt='Settled' onClick={() => handleStepClick(9)}/></Circle>
//                         <TooltipStep className="tooltipStep" style={{ bottom: '60px' }}>
//                             <Typography variant="body2" fontSize='12px'>Amount Credited to VC Account - WINNNNNN</Typography>
//                             <Tooltipline className="tooltipLine"></Tooltipline>
//                         </TooltipStep>
//                     </Steps>
//                     <Box>
//                         <LineWrapper style={{ left: '0', top: '20px'}}><Line className={getStage(2)}></Line></LineWrapper>
//                         <LineWrapper style={{ right: '0', top: '20px'}}><Line className={getStage(3)}></Line></LineWrapper>
//                         <LineWrapper style={{ right: '-49px', top: '25%', transform: 'translate(48px) rotate(90deg)'}}><Line className={getStage(4)}></Line></LineWrapper>
//                         <LineWrapper style={{ left: '0', top: 'calc(50% - 2px)'}} ><Line className={getStage(6)}></Line></LineWrapper>
//                         <LineWrapper style={{ right: '0', top: 'calc(50% - 2px)'}}><Line className={getStage(5)}></Line></LineWrapper>
//                         <LineWrapper style={{ left: '-34px', top: '70%', transform: 'translate(-60px) rotate(90deg)'}}><Line className={getStage(7)}></Line></LineWrapper>
//                         <LineWrapper style={{ left: '0', bottom: '20px'}}><Line className={getStage(8)}></Line></LineWrapper>
//                         {/* <LineWrapper style={{ right: '0', bottom: '20px'}}><Line></Line></LineWrapper> */}
//                     </Box>
//                 </StepsWrap>
//                 {showConfetti && ( <Confetti   width={window.innerWidth} height={window.innerHeight} recycle={false} /> )}
//             </StepMain>
       
//         </Box>
//     )
// }







/*---------------------------------------------------------- My code 2 -----------------------------------------------------------------------*/




import React, { useState, useEffect } from 'react';
import { Grid, Button, styled, Divider, Typography, Tooltip} from '@mui/material';
import { Box, positions } from '@mui/system';
// import Swal from "sweetalert2";
import Confetti from "react-confetti";
import { useTheme } from '@emotion/react';
import SettledImg from "../../../assets/images/settled.jpg";
import eventEmitter from '../../../eventEmitter';


export default function CustomStepper({ account }) {


    // console.log("Account:", account);
    // const[stage, setStage] = useState(account.stage);
    const [stage, setStage] = useState(account.stage || 0);
    const theme = useTheme();
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiDuration, setConfettiDuration] = useState(1000);
    const StepMain = styled(Box)(({ theme }) => ({
        position: 'relative',
        width: '100%'
    }));
    const [vendorName, setVendorName] = useState(() => {
        return sessionStorage.getItem('selectedVendorName') || '';
    });

    useEffect(() => {
        const handleVendorNameSelected = (name) => {
            setVendorName(name);
            sessionStorage.setItem('selectedVendorName', name); // Update sessionStorage
        };

        eventEmitter.on('vendorNameSelected', handleVendorNameSelected);

        // Clean up the event listener on component unmount
        return () => {
            eventEmitter.off('vendorNameSelected', handleVendorNameSelected);
        };
    }, []);


    useEffect(() => {
        // Update stage whenever account.stage changes
        setStage(account.stage || 0);
        // console.log("CustomStepper received account:", account);
    }, [account]);
    
    function getStage(stepperStage){
        
        if(stepperStage <= parseInt(stage)){
           return 'active';
           console.log(typeof(stage))
        }
        console.log(stage);
        
    }
    const StepsWrap = styled(Box)(({ theme }) => ({
        position: 'relative',
        width: '420px',
        height: '450px',
        margin: 'auto',
        marginTop:'140px',
    }));
    const Steps = styled(Button)(({ theme }) => ({
        position: 'absolute',
        minWidth: 'inherit',
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        padding: 0,
        '&:active': {
            '.tooltipStep' : {
                opacity: '1',
                visibility: 'visible',

            }
        },
        '&.active': {
			'.circle': {
                backgroundColor: theme.palette.primary.main,
                color: 'white'
            },
            '.stepText': {
                backgroundColor: theme.palette.primary.extraLight,
                color: theme.palette.primary.main
            },
            '.tooltipStep': {
                backgroundColor: theme.palette.primary.main,
                color: 'white'
            },
            '.tooltipLine': {
                backgroundColor: theme.palette.primary.main
            }
		}
    }));
    const Circle = styled(Box)(({ theme }) => ({
        backgroundColor: '#DBDCDE',
        borderColor: '#DBDCDE',
        color: theme.palette.primary.main,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderRadius: '50%',
        zIndex: '99',
        position: 'relative'
    }));
    const LineWrapper = styled(Box)(({ theme }) => ({    
        width: '55%',    
        position: 'absolute'
    }));
    const Line = styled(Divider)(({ theme }) => ({
        width: '100%',
        borderColor: '#DBDCDE',
        borderWidth: '3px',
        '&.active': {
            borderColor: theme.palette.primary.main
        }
    }));
    const TooltipStep = styled(Box)(({ theme }) => ({
        width: '150px',
        height: '100px',
        backgroundColor: '#DBDCDE',
        color: '#183D72',
        padding: '10px',
        borderRadius: '7px',
        fontWeight: 600,
        display:'flex',
        alignItems:'center',
        justifyContent:'center', 
        textAlign: 'center',
        position: 'absolute',
        transform: 'translate(3px, 10px)',
        transition: 'all 0.4s ease',
        zIndex: 99
    }));
    const Tooltipline = styled(Box)(({ theme }) => ({
        position: 'absolute',
        display: 'flex',
        width: '15px',
        height: '4px',
        transform: 'rotate(90deg)',
        left: 'calc(50% - 10px)',
        bottom: '-8px',
        backgroundColor: '#DBDCDE',
    }));
    const handleStepClick = stepNumber => {
        if (stepNumber === 9) {
            setShowConfetti(true);
            Swal.fire({
                title: 'Congratulations!',
                text: 'You are at the final stage!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            setTimeout(() => {
                setShowConfetti(false);
            }, confettiDuration);
        }
    };


    


    return (
        <Box>
            {/* <StepMain>
                <StepsWrap>
                    <Steps className={getStage(4)}>
                        <Circle className="circle">1</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Findings Shared – Awaiting Contract</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps>
                    <Steps className={getStage(4)} style={{ left: '0', right: '0', margin: 'auto' }}>
                        <Circle className="circle">2</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2"  fontSize='12px'>Disputes Raised – Submitted</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps className={getStage(4)} style={{ right: '0' }}>
                        <Circle className="circle">3</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2"  fontSize='12px'>Outstanding Balance Shared by Amazon – Open Bal. Confirmed</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps>
                    <Steps className={getStage(4)} style={{ right: '0', top: 'calc(50% - 20px)' }}>
                        <Circle className="circle">4</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Offer Received – File not received</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps style={{ left: '0', right: '0', top: 'calc(50% - 20px)', margin: 'auto' }}>
                        <Circle className="circle">5</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Settlement Offer Received from Amazon – Offer Shared with Customer</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps style={{ left: '0', top: 'calc(50% - 20px)' }}>
                        <Circle className="circle">6</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Counteroffer Presented to Amazon – Counteroffer Submitted</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps style={{ bottom: '0' }}>
                        <Circle className="circle">7</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2"fontSize='12px'>Revised Settlement Offer from Amazon – Revised Offer Shared with Customer</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps style={{ left: '0', right: '0', bottom: '0', margin: 'auto' }}>
                        <Circle className="circle">8</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Final Settlement Accepted – Settlement Accepted</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps>
                    <Steps style={{ right: '0', bottom: '0' }}>
                        <Circle style={{ zIndex: '999' }}><img width="50" src={SettledImg} alt='Settled' onClick={() => handleStepClick(9)}/></Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '60px' }}>
                            <Typography variant="body2" fontSize='12px'>Amount credited to VC account – WINNNNNN</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps>
                    <Box>
                        <LineWrapper style={{ left: '0', top: '20px'}}><Line className={getStage(4)}></Line></LineWrapper>
                        <LineWrapper style={{ right: '0', top: '20px'}}><Line className={getStage(4)}></Line></LineWrapper>
                        <LineWrapper style={{ right: '-49px', top: '25%', transform: 'translate(48px) rotate(90deg)'}}><Line className={getStage(4)}></Line></LineWrapper>
                        <LineWrapper style={{ left: '0', top: 'calc(50% - 2px)'}}><Line></Line></LineWrapper>
                        <LineWrapper style={{ right: '0', top: 'calc(50% - 2px)'}}><Line></Line></LineWrapper>
                        <LineWrapper style={{ left: '-34px', top: '70%', transform: 'translate(-60px) rotate(90deg)'}}><Line></Line></LineWrapper>
                        <LineWrapper style={{ left: '0', bottom: '20px'}}><Line></Line></LineWrapper>
                        <LineWrapper style={{ right: '0', bottom: '20px'}}><Line></Line></LineWrapper>
                    </Box>
                </StepsWrap>
                {showConfetti && ( <Confetti   width={window.innerWidth} height={window.innerHeight} recycle={false} /> )}
            </StepMain> */}
            {/* use if elese condition for checking step 8 or 9 for admin account and other account  */}
            <StepMain>
                <StepsWrap>
                    <Steps className={getStage(1)}>
                        <Circle className="circle">1</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Findings Shared – Awaiting Contract</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps>
                    <Steps className={getStage(2)} style={{ left: '0', right: '0', margin: 'auto' }}>
                        <Circle className="circle">2</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2"  fontSize='12px'>Disputes Raised – Submitted</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps className={getStage(3)} style={{ right: '0' }}>
                        <Circle className="circle">3</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2"  fontSize='12px'>Outstanding Balance Shared by Amazon – Open Bal. Confirmed</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps>
                    <Steps className={getStage(4)} style={{ right: '0', top: 'calc(50% - 20px)' }}>
                        <Circle className="circle">4</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Settlement Offer Received from Amazon – Offer Shared with Customer</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps className={getStage(5)} style={{ left: '0', right: '0', top: 'calc(50% - 20px)', margin: 'auto' }}>
                        <Circle className="circle">5</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Counteroffer Presented to Amazon – Counteroffer Submitted</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps className={getStage(6)} style={{ left: '0', top: 'calc(50% - 20px)' }}>
                        <Circle className="circle">6</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'> Revised Settlement Offer from Amazon – Revised Offer Shared with Customer</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    <Steps className={getStage(7)} style={{ bottom: '0' }}>
                        <Circle className="circle">7</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2"fontSize='12px'>Final Settlement Accepted – Settlement Accepted</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>    
                    </Steps>
                    {/* <Steps style={{ left: '0', right: '0', bottom: '0', margin: 'auto' }}>
                        <Circle className="circle">8</Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '64px' }}>
                            <Typography variant="body2" fontSize='12px'>Final Settlement Accepted – Settlement Accepted</Typography>
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps> */}
                    <Steps className={getStage(8)} style={{ left: '0', right: '0', bottom: '0', margin: 'auto' }}>
                        <Circle style={{ zIndex: '999' }}><img width="50" src={SettledImg} alt='Settled' onClick={() => handleStepClick(9)}/></Circle>
                        <TooltipStep className="tooltipStep" style={{ bottom: '60px' }}>
                            <Typography variant="body2" fontSize='12px'>Amount Credited to - {vendorName}</Typography>
                            {/* <Typography variant="body2" fontSize='12px'>Amount Credited to VC Account - WINNNNNN</Typography> */}
                            <Tooltipline className="tooltipLine"></Tooltipline>
                        </TooltipStep>
                    </Steps>
                    <Box>
                        <LineWrapper style={{ left: '0', top: '20px'}}><Line className={getStage(2)}></Line></LineWrapper>
                        <LineWrapper style={{ right: '0', top: '20px'}}><Line className={getStage(3)}></Line></LineWrapper>
                        <LineWrapper style={{ right: '-49px', top: '25%', transform: 'translate(48px) rotate(90deg)'}}><Line className={getStage(4)}></Line></LineWrapper>
                        <LineWrapper style={{ left: '0', top: 'calc(50% - 2px)'}} ><Line className={getStage(6)}></Line></LineWrapper>
                        <LineWrapper style={{ right: '0', top: 'calc(50% - 2px)'}}><Line className={getStage(5)}></Line></LineWrapper>
                        <LineWrapper style={{ left: '-34px', top: '70%', transform: 'translate(-60px) rotate(90deg)'}}><Line className={getStage(7)}></Line></LineWrapper>
                        <LineWrapper style={{ left: '0', bottom: '20px'}}><Line className={getStage(8)}></Line></LineWrapper>
                        {/* <LineWrapper style={{ right: '0', bottom: '20px'}}><Line></Line></LineWrapper> */}
                    </Box>
                </StepsWrap>
                {showConfetti && ( <Confetti   width={window.innerWidth} height={window.innerHeight} recycle={false} /> )}
            </StepMain>
       
        </Box>
    )
}











