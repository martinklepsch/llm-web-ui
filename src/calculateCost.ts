// this does not consider caching or potential usage of batch APIs
// some of the pricing data has been created with perplexity deep research
// e.g.: https://www.perplexity.ai/search/please-create-a-js-datastructu-jiVsO76ZQy6EmTi6F.3Urw

function lookupPricing(modelName: string) {
    const inputParts = modelName.split('-');
    let bestMatch = null;
    let maxScore = -1;
    let maxFullMatch = false;
    let maxKeyLength = -1;

    for (const key of Object.keys(pricingPerMillionTokens)) {
        const keyParts = key.split('-');
        let score = 0;

        // Compare parts sequentially
        for (let i = 0; i < keyParts.length; i++) {
            if (i >= inputParts.length) break;
            if (keyParts[i] === inputParts[i]) score++;
            else break;
        }

        const isFullMatch = score === keyParts.length;
        const isBetterCandidate = (
            score > maxScore ||
            (score === maxScore && (
                (isFullMatch && !maxFullMatch) ||
                (isFullMatch === maxFullMatch && keyParts.length > maxKeyLength)
            ))
        );

        if (isBetterCandidate) {
            maxScore = score;
            maxFullMatch = isFullMatch;
            maxKeyLength = keyParts.length;
            bestMatch = key;
        }
    }

    return pricingPerMillionTokens[bestMatch];
}


export function calculateCost(inputTokens: number, outputTokens: number, model: string) {
    const modelPricing = lookupPricing(model)
    if (modelPricing) {
        const inputCost = inputTokens * modelPricing.input / 1000000;
        const outputCost = outputTokens * modelPricing.output / 1000000;
        const totalCost = inputCost + outputCost;
        if (inputTokens && outputTokens) {
            return { totalCost, inputCost, outputCost };
        }
    } else {
        return {}
    }
}

const openAI = {
    "gpt-4o": {
        input: 2.50,
        output: 10.00
    },
    "gpt-4o-mini": {
        input: 0.15,
        output: 0.60
    },
    "o1": {
        input: 15.00,
        output: 60.00
    },
    "o3-mini": {
        input: 1.10,
        output: 4.40
    },
    "gpt-4o-audio-preview": {
        input: 40.00,
        output: 80.00
    },
    "gpt-4o-realtime-preview": {
        input: 5.00,
        output: 20.00
    },
    "gpt-4o-mini-audio-preview": {
        input: 10.00,
        output: 20.00
    },
    "gpt-4o-mini-realtime-preview": {
        input: 0.60,
        output: 2.40
    },
    "o1-mini": {
        input: 1.10,
        output: 4.40
    },
}

const anthropic = {
    "claude-3-5-haiku": {
        input: 1.00,
        output: 5.00
    },
    "claude-3-5-sonnet": {
        input: 3.00,
        output: 15.00
    },
    "claude-3-opus": {
        input: 15.00,
        output: 75.00
    },
    "claude-3-haiku": {
        input: 0.25,
        output: 1.25
    },
    "claude-2.1": {
        input: 11.02,
        output: 32.68
    },
    "claude-instant": {
        input: 1.63,
        output: 5.51
    }
}

const pricingPerMillionTokens = {
    ...openAI,
    ...anthropic,
}
