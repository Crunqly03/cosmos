import React from 'react'
import styled from 'styled-components'

export interface InputProps {
  endAdornment?: React.ReactNode
  onChange: (e: React.FormEvent<HTMLInputElement>) => void
  placeholder?: string
  startAdornment?: React.ReactNode
  value: string
  defaultDesign?:boolean
}

const Input: React.FC<InputProps> = ({ endAdornment, onChange, placeholder, startAdornment, value ,defaultDesign}) => {
  if(!defaultDesign){
    return (
      <StyledCustomInputWrapper>
        {!!startAdornment && startAdornment}
        <StyledCustomInput placeholder={placeholder} value={value} onChange={onChange} />
        {!!endAdornment && endAdornment}
      </StyledCustomInputWrapper>
    )
  }
  return (
    <StyledInputWrapper>
      {!!startAdornment && startAdornment}
      <StyledInput placeholder={placeholder} value={value} onChange={onChange} />
      {!!endAdornment && endAdornment}
    </StyledInputWrapper>
  )

}

const StyledInputWrapper = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.input};
  border-radius: ${(props) => props.theme.radii.default};
  display: flex;
  height: 72px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
`
const StyledCustomInputWrapper = styled.div`
  align-items: center;
  background-color: transparent;
  border-radius: 10px;
  display: flex;
  height: 50px;
  padding: 0 ${(props) => props.theme.spacing[3]}px;
  border:2px solid white;
`
const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  font-size: 18px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
`
const StyledCustomInput = styled.input`
  width: 100%;
  background: none;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  font-size: 25px;
  flex: 1;
  height: 56px;
  margin: 0;
  padding: 0;
  outline: none;
`
export default Input
