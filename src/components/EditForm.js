import React from 'react'
import ModelForm from './ModelForm'
import { Edit } from 'react-admin'

export default function PostCreate (model) {
  const CreateForm = props => (
    <Edit {...props}>
        { ModelForm(model, true)}
    </Edit>
  )
  return CreateForm
}
