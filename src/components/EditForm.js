import React from 'react'
import ModelForm from './ModelForm'
import { Edit, TabbedForm } from 'react-admin'

export default function PostCreate (model) {
  const {General, OtherTabs} = ModelForm(model)
  const CreateForm = props => (
    <Edit {...props}>
      <TabbedForm>
        <General />
      </TabbedForm>
    </Edit>
  )
  return CreateForm
}
