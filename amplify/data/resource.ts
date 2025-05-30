import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
    Note: a
        .model({
            id: a.id().required(),
            title: a.string().required(),
            text: a.string().required(),
            createdAt: a.string().required(),
            updatedAt: a.string().required(),
        })
        .authorization((allow) => [allow.publicApiKey()]),

    summarize: a
        .generation({
            aiModel: a.ai.model("Claude 3 Sonnet"),
            systemPrompt:
                "You are a helpful assistant that summarizes notes. " +
                "Give a concise summary of the supplied note. " +
                "The summary should be one or two sentences long",
            inferenceConfiguration: {
                temperature: 0.7,
                topP: 1,
                maxTokens: 600,
            },
        })
        .arguments({
            text: a.string(),
        })
        .returns(
            a.customType({
                summary: a.string(),
            })
        )
        .authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    logging: true,
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "apiKey",
        // API Key is used for a.allow.public() rules
        apiKeyAuthorizationMode: {
            expiresInDays: 30,
        },
    },
});
