import React from 'react'
import styled from 'styled-components'
import { Button } from '@macist-m/robinia-uikit'
import Input, { InputProps } from '../Input'

interface CustomInputProps extends InputProps {
  symbol?: string
  endAbdormentAction?: () => void
  endAbdormentText?:string
  inputTitle?:string
}

const CustomInput: React.FC<CustomInputProps> = ({  symbol, onChange, endAbdormentAction, value,endAbdormentText,inputTitle}) => {

  return (
    <StyledCustomInput>
        <StyledTitleText>
            {inputTitle}
        </StyledTitleText>
      <Input
        endAdornment={
          <StyledTokenAdornmentWrapper>
            <StyledTokenSymbol>{symbol}</StyledTokenSymbol>
            <StyledSpacer />
            <div>
              <StyledButton type='button' onClick={endAbdormentAction}>
                {endAbdormentText}
              </StyledButton>
            </div>
          </StyledTokenAdornmentWrapper>
        }
        onChange={onChange}
        placeholder="0"
        value={value}
        defaultDesign={false}
      />
    </StyledCustomInput>
  )
}

const StyledCustomInput = styled.div`
max-width:330px;
margin:4px;
width:100%;
@media (max-width: 768px) {
max-width:100%;
}
`
const StyledButton = styled.button`
color:#fff;
font-size: 25px;
font-weight: 600;
font-stretch: normal;
font-style: normal;
line-height: 1.2;
letter-spacing: normal;
text-align: right;
outline:none;
`
const StyledSpacer = styled.div`
  width: ${(props) => props.theme.spacing[3]}px;
`

const StyledTokenAdornmentWrapper = styled.div`
  align-items: center;
  display: flex;
`

const StyledTitleText = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  font-size: 18px;
  font-weight: 700;
  height: 44px;
  justify-content: flex-start;
  margin-left:8px
`

const StyledTokenSymbol = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: 700;
`

export default CustomInput
