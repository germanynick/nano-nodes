import { IExecuteFunctions } from 'n8n-core';
import { INodeExecutionData } from 'n8n-workflow';
import createBinance from 'binance-api-node';

export async function execute(
	this: IExecuteFunctions,
	index: number,
): Promise<INodeExecutionData[]> {
	const credentials = await this.getCredentials('binanceApi', index);
	const binanceClient = createBinance(credentials);
	const symbol = this.getNodeParameter('symbol', index) as string;

	const stats = await binanceClient.futuresDailyStats({ symbol });

	return this.helpers.returnJsonArray(stats as any);
}
