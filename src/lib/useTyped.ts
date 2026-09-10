import { useEffect, useState } from 'react'

export function useTyped(strings: string[], speed = 28, hold = 2200) {
  const [i, setI] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = strings[i % strings.length]
    let t: number
    if (!deleting && text === full) t = window.setTimeout(() => setDeleting(true), hold)
    else if (deleting && text === '') {
      setDeleting(false)
      setI((n) => n + 1)
      return
    } else
      t = window.setTimeout(
        () => setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1)),
        deleting ? speed / 2 : speed,
      )
    return () => clearTimeout(t)
  }, [text, deleting, i, strings, speed, hold])

  return text
}
