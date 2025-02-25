import { z } from "zod";

export const dataTypeCodec = z.enum(["f", "vec2", "vec3", "text"]);
export const extent2dCodec = z.object({
  x: z.number(),
  y: z.number(),
});

export const designCodec = z.object({
  designId: z.string(),
  name: z.string(),
  description: z.string(),
  owner: z.string(),
  createdAt: z.date(),
  lastModifiedAt: z.date(),
  isPublic: z.boolean(),
  blueprintId: z.string(),
  parameters: z.object({
    name: z.string(),
    description: z.string(),
    defaultValue: z.string(),
    type: dataTypeCodec,
  }),
});

export const blueprintSurfaceCodec = z.object({
  surfaceId: z.string(),
  name: z.string(),
  description: z.string(),
  size: extent2dCodec,
});

export const blueprintVariantCodec = z.object({
  variantId: z.string(),
  name: z.string(),
  description: z.string(),
  priceAdjustment: z.number(),
});

export const blueprintCodec = z.object({
  blueprintId: z.string(),
  name: z.string(),
  description: z.string(),
  provider: z.string(),
  providerParams: z.record(z.string()),
  surfaces: blueprintSurfaceCodec.array(),
  variants: blueprintVariantCodec.array(),
});

export const graphNodeCodec = z.object({
  nodeId: z.string(),
  type: z.enum(['temp','temp2'] )
});

export const surfaceGraphCodec = z.object({
  version: z.string(),
  nodes: graphNodeCodec.array()
});