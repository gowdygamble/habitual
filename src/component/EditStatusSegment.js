import React from 'react'

import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CancelIcon from '@mui/icons-material/Cancel';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function EditStatusSegment(props) {
  return (
    <div>
        <CheckCircleIcon onClick={() => props.handleStatusChange(props.habitId, "complete")} />
        <CancelIcon onClick={() => props.handleStatusChange(props.habitId, "failed")} />
        <RadioButtonUncheckedIcon onClick={() => props.handleStatusChange(props.habitId, "incomplete")} />
    </div>
  )
}

export default EditStatusSegment