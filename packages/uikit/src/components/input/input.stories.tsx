import type React from 'react'

import { capitalize } from '../../utils/capitalize.js'

import { CloseIcon, SearchIcon } from '../../icons/index.js'
import { intent } from '../types/shared.js'
import { size, variant } from './types/input.js'

import { Input, InputAdornment } from './index.js'

export default {
  title: 'Components/Input/TextInput',
  component: Input,
  argTypes: {},
}

export const Default = (): React.JSX.Element => {
  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <Input
            variant="outlined"
            intent="primary"
            id="name"
            name="name"
            label="Name"
            placeHolder="Name"
            helpText="Please enter your name."
            disabled={false}
            error={false}
          />
          <Input
            variant="outlined"
            intent="secondary"
            required
            id="foo"
            name="foo"
            label="Foo Required"
            placeHolder="Foo"
            helpText="Please enter your foo."
            disabled={false}
            error={false}
          />
          <Input
            variant="outlined"
            intent="primary"
            label="Start and End Adornments"
            startAdornment={
              <InputAdornment>
                <SearchIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment>
                <CloseIcon />
              </InputAdornment>
            }
            id="search"
            name="search"
            placeHolder="Search"
            disabled={false}
            error={false}
          />
        </div>
      </div>
    </>
  )
}

export const Variants = (): React.JSX.Element => {
  return (
    <>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {variant.map((variant) => {
          return (
            <div key={variant} className="grid grid-cols-4 items-center gap-12 mb-6">
              {size.map((size) => {
                return (
                  <Input
                    key={`${variant}=${size}`}
                    variant={variant}
                    inputSize={size}
                    id={`${variant}-${size}`}
                    name={`${variant}-${size}`}
                    label={`${capitalize(variant)} ${size.toUpperCase()}`}
                    placeHolder={`${capitalize(variant)} ${size.toUpperCase()}`}
                    helpText={`Please enter your ${variant} ${size.toUpperCase()}.`}
                    disabled={false}
                    error={false}
                  />
                )
              })}
              <Input
                disabled={true}
                key={`${variant}=${size}`}
                variant={variant}
                id={`${variant}-${size}`}
                name={`${variant}-${size}`}
                label={`${capitalize(variant)} Disabled`}
                placeHolder={`${capitalize(variant)} disabled`}
                helpText={`Please enter your ${variant} disabled.`}
                error={false}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export const Intents = (): React.JSX.Element => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      {intent.map((i) => {
        return (
          <div key={i} style={{ marginBottom: '12px' }}>
            <Input
              key={i}
              variant="outlined"
              intent={i}
              inputSize="md"
              id={i}
              name={i}
              label={capitalize(i)}
              placeHolder={capitalize(i)}
              helpText={`Please enter your ${i}`}
              disabled={false}
              error={false}
            />
          </div>
        )
      })}
    </div>
  )
}

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
export const Error = (): React.JSX.Element => {
  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Input
          required
          id="name"
          name="name"
          label="Name"
          placeHolder="Name"
          helpText="Please enter your name."
          disabled={false}
          error={true}
          errorText="Please enter a valid name."
        />
      </div>
    </>
  )
}
