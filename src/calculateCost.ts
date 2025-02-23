export function calculateCost(inputTokens: number, outputTokens: number, model: string) {
    const inputCost = inputTokens * 0.15 / 1000000;
    const outputCost = outputTokens * 0.60 / 1000000;
    const totalCost = inputCost + outputCost;
    if (inputTokens && outputTokens) {
        return { totalCost, inputCost, outputCost };
    } else {
        return {}
    }
}
