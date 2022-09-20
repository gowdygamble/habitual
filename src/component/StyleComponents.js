import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`;

export const CustomForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export const CustomTextInput = styled.input`
  margin-right: 10px;
  font-size: 20px;
  border: 2px solid grey;
  border-radius: 3px;
  width: 400px;
  height: 40px;
  text-align: center;
`

export const CustomButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid black;
  color: black;
  margin: 8px 1em;
  padding: 0.25em 1em;
  `