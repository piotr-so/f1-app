import styled, { css } from 'styled-components/macro';
import { FontColors, BackgroundColors } from '../../modules/constants';

const theme = {
    mercedes: 'linear-gradient(25deg, rgba(0,210,190,1) 0%, rgba(223,246,244,1) 45%, rgba(255,255,255,1) 65%)',
    ferrari: 'linear-gradient(25deg, rgba(220,0,0,1) 0%, rgba(255,229,229,1) 45%, rgba(255,255,255,1) 65%)',
    redbull: 'linear-gradient(25deg, rgba(30,65,255,1) 0%, rgba(219,224,248,1) 45%, rgba(255,255,255,1) 65%)',
    mclaren: 'linear-gradient(25deg, rgba(255,135,0,1) 0%, rgba(255,241,226,1) 45%, rgba(255,255,255,1) 65%)',
    renault: 'linear-gradient(25deg, rgba(255,245,0,1) 0%, rgba(252,251,214,1) 45%, rgba(255,255,255,1) 65%)',
    tororosso: 'linear-gradient(25deg, rgba(68,152,249,1) 0%, rgba(212,228,249,1) 45%, rgba(255,255,255,1) 65%)',
    racingpoint: 'linear-gradient(25deg, rgba(245,150,200,1) 0%, rgba(255,240,248,1) 45%, rgba(255,255,255,1) 65%)',
    alfaromeo: 'linear-gradient(25deg, rgba(155,0,0,1) 0%, rgba(255,227,227,1) 45%, rgba(255,255,255,1) 65%)',
    haasf1team: 'linear-gradient(25deg, rgba(189,158,87,1) 0%, rgba(255,249,235,1) 45%, rgba(255,255,255,1) 65%)',
    williams: 'linear-gradient(25deg, rgba(230,226,226,1) 0%, rgba(245,245,245,1) 45%, rgba(255,255,255,1) 65%)'
}

export const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 224px;
    height: 312px;
    color: ${FontColors.driverCard};
    background: ${props => theme[props.theme]};
    box-shadow: 3px 3px 6px #00000029;
    border: 1px solid #9D9797;
    border-radius: 10px;
    margin-right: 20px;
    ${props => props.scaled && css`
        transform: scale(0.9) translateY(18px);
    `};
    transition: transform .5s;
`;
export const DriverInfo = styled.div`
    display: flex;
`;
export const DriverNumber = styled.div`
    font-size: 100px;
    font-weight: bold;
    padding-top: 13px;
    opacity: 0.42;
    padding-left: ${props => props.fixPosition ? '5px' : undefined};
`;
export const DriverDescription = styled.div`
    font-weight: bold;
    padding-left: ${props => props.fixPosition ? '12px' : undefined};
`;
export const Name = styled.div`
    font-size: 20px;
    padding-top: 29px;
`;
export const Team = styled.div`
    font-size: 16px;
    margin: 8px 0;
`;
export const Points = styled.div`
    min-width: 84px;
    text-align: center;
    font-size: 16px;
    color: ${FontColors.secondary};
    background-color: ${BackgroundColors.driverCard};
    border-radius: 5px;
`;
export const DriverImg = styled.img`
    margin: 0 auto;
`;