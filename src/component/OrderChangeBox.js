import React from 'react'
import styled from 'styled-components';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const OrderChangeBoxStyle = styled.div`
    //border: 1px solid red;
    display: flex;
    flex-direction: column;
`

function OrderChangeBox(props) {
  return (
    <OrderChangeBoxStyle>
        <ArrowDropUpIcon onClick={props.upHandler}/>
        <ArrowDropDownIcon onClick={props.downHandler}/>
    </OrderChangeBoxStyle>
  )
}

export default OrderChangeBox