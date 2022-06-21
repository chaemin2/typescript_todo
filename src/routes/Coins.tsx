import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Link, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from './api';

const Container = styled.div`
	padding: 0px 10px;
`;

const Header = styled.header`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	color: ${props => props.theme.bgColor};
	border-radius: 15px;
	margin-bottom: 10px;
	a {
		display: flex;
		align-items: center;
		padding: 20px;
		transition: color 0.2s ease-in;
	}
	&:hover {
		a {
			color: ${props => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	color: ${props => props.theme.accentColor};
	font-size: 48px;
`;

const Loader = styled.div`
	text-align: center;
	display: block;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

interface ICoin {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	/*
	const [coins, setCoins] = useState<CoinInterface[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const response = await fetch('https://api.coinpaprika.com/v1/coins');
			const json = await response.json();

			setCoins(json.slice(0, 100));
			setLoading(false);
		})();
	}, []);
	*/
	const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);

	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinList>
					{data?.slice(0, 100).map(coin => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name }
								}}
							>
								<Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinList>
			)}
		</Container>
	);
}

export default Coins;
