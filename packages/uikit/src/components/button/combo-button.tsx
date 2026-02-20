import cx from 'classnames'

import { ChevronDownIcon } from '../../icons/chevron-down-icon'
import { Dropdown as DropdownComponent } from '../dropdown/dropdown'
import { Button, type ButtonProps } from './button'
import styles from './combo-button.module.css'

export type ComboButtonProps = ButtonProps & {
  options: { label: string; value: string }[]
  onButtonClick?: () => void
  onOptionSelect?: (value: string) => void
  children?: React.ReactNode
  align?: 'start' | 'center' | 'end'
  dataSide?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
}


export const ComboButton = ({
  options,
  onButtonClick,
  onOptionSelect,
  children,
  align = 'end',
  dataSide = 'top',
  sideOffset = 5,
  ...rest
}: ComboButtonProps) => {
  return (
    <div className={cx('combo-button-wrapper', styles['combo-button-wrapper'])}>
      <Button className={cx('combo-button-button', styles['combo-button-button'])} {...rest} onClick={onButtonClick}>
        {children}
      </Button>
      <DropdownComponent.Root>
        <DropdownComponent.Trigger asChild>
          <Button className={cx('combo-button-trigger', styles['combo-button-trigger'])} {...rest}>
            <ChevronDownIcon width="16px" height="16px" />
          </Button>
        </DropdownComponent.Trigger>

        <DropdownComponent.Portal>
          <DropdownComponent.Content
            className={cx('combo-button-options', styles['combo-button-options'])}
            align={align}
            data-side={dataSide}
            sideOffset={sideOffset}
          >
            {options.map((option) => (
              <DropdownComponent.Item
                key={option.value}
                onSelect={() => onOptionSelect?.(option.value)}
              >
                <div className={cx('combo-button-options-item', styles['combo-button-options-item'])}>{option.label}</div>
              </DropdownComponent.Item>
            ))}
          </DropdownComponent.Content>
        </DropdownComponent.Portal>
      </DropdownComponent.Root>
    </div>
  )
}
