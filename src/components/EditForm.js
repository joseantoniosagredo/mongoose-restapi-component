import React from 'react'
import ModelForm from './ModelForm'
import { Edit } from 'react-admin'

export default function PostCreate (models, model) {
  const CreateForm = props => (
    <Edit {...props}>
        { ModelForm(models, model, true)}
    </Edit>
  )
  return CreateForm
}
