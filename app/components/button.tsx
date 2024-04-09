'use client'

import Link, { LinkProps } from 'next/link'
import { ComponentPropsWithRef, createElement, forwardRef } from 'react'

// Types
type Tag = 'button' | 'input' | 'a'
type Element = HTMLButtonElement | HTMLInputElement | HTMLAnchorElement

type Button = {
  tag: 'button'
  type?: ComponentPropsWithRef<'button'>['type']
  role?: never
}
type Anchor = {
  tag: 'a'
  linkProps: LinkProps
  href?: never
  ref?: never
  target?: never
  role?: never
}
type Input = {
  tag: 'input'
  value: ComponentPropsWithRef<'input'>['value']
  type: ComponentPropsWithRef<'input'>['type']
  children?: never
  role?: never
}

export type ButtonProps<T extends Tag> = ComponentPropsWithRef<T> &
  (T extends 'button' ? Button : T extends 'a' ? Anchor : Input)

// Utils
const isExternalLink = (href: LinkProps['href']) => {
  const target = typeof href === 'string' ? href : href.href
  return target?.startsWith('http') || target?.startsWith('//')
}

// Component
export const Button = forwardRef<Element, ButtonProps<Tag>>((props, ref) => {
  if (!props.tag) {
    throw new Error('tag props is required')
  }

  if (props.tag === 'a') {
    const { tag, linkProps, ...otherProps } = props
    return (
      <Link {...linkProps}>
        {createElement(tag, {
          ref,
          ...otherProps,
          role: 'button',
          target: isExternalLink(linkProps.href) ? '_blank' : undefined,
          rel: isExternalLink(linkProps.href)
            ? 'noopener noreferrer'
            : undefined,
        })}
      </Link>
    )
  }

  const { tag, ...otherProps } = props
  return createElement(tag, { ref, type: 'button', ...otherProps })
})



// export const Foo = () => {
// 	return (
// 	  <div>
// 		<Button tag="button" onClick={() => console.log('foo')}>
// 		  foo
// 		</Button>
// 		<Button tag="a" linkProps={{ href: '#' }}>
// 		  foo
// 		</Button>
// 		<form>
// 		  <Button tag="input" type="submit" value="foo" />
// 		</form>
// 	  </div>
// 	)
//   }