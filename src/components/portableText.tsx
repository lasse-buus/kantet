import Image from 'next/image'
import type { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value?.asset?.url ? (
        <figure className="my-12">
          <Image
            src={value.asset.url}
            alt={value.alt ?? ''}
            width={value.asset.metadata?.dimensions?.width ?? 1600}
            height={value.asset.metadata?.dimensions?.height ?? 900}
            className="w-full h-auto rounded-[8px]"
          />
        </figure>
      ) : null,
  },
}
