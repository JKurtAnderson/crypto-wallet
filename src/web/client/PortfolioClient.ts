import PortfolioClientInterface from "./PortfolioClientInterface";


let client: PortfolioClientInterface;

export function setClient(c: PortfolioClientInterface){
	client = c;
}
export function getClient(){
	return client;
}