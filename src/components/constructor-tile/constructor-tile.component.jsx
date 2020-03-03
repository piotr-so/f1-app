import React from 'react';
import { ConstructorWrapper, ConstructorDesc, Name, CarImgContainer, CarImg, StripeOne, StripeTwo, StripeThree, PointsInfo, Number, Desc } from './constructor-tile.styled';

const ConstructorTile = ({ constructorId , constructorName, position, points, img }) => {
    return (
        <ConstructorWrapper>
            <ConstructorDesc>
                <Name>{position}. {constructorName}</Name>
                <CarImgContainer>
                    <CarImg src={img} />
                    <StripeOne constructorId={constructorId} />
                    <StripeTwo constructorId={constructorId} />
                    <StripeThree constructorId={constructorId} />
                </CarImgContainer>
            </ConstructorDesc>
            <PointsInfo>
                <Number>{points}</Number>
                <Desc>PTS</Desc>
            </PointsInfo>
        </ConstructorWrapper>
    )
}

export default ConstructorTile;