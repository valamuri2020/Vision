import React from "react";
import {
  Content,
  Card,
  Information,
} from "./dasboardStyle.jsx";
import { HiLocationMarker } from 'react-icons/hi'
import { SiGooglescholar } from 'react-icons/si'
import { MdMonetizationOn } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'


export default function DashboardCard({ college, ...props }) {
  const { INSTNM, CITY, ADM_RATE_ALL, STABBR, AVG_COST, SAT_AVG_ALL, INSTURL, ACT_AVG } = college;

  const iconStyle = { fontSize: '24px', margin: '0px 10px' }
  return (
    <Card>
        {/* information about the institute itself */}
        <Information>
          <Content>
            <a href={INSTURL}><h3>{INSTNM}</h3></a>
          </Content>
          <Content> <HiLocationMarker style={iconStyle}/> {CITY}, {STABBR} </Content>
          <Content> <FaEdit style={iconStyle}/>Edit this information</Content>
        </Information>
        {/* information about the academics focused info */}
        <Information>
          <Content> <SiGooglescholar style={iconStyle}/> Acceptance Rate: {ADM_RATE_ALL * 100}% </Content>
          <Content color={"#46b3e6"}> <MdMonetizationOn style={iconStyle}/> Average Yearly Tuition: ${AVG_COST}</Content>
          <Content color={"#30c735"}> <MdMonetizationOn style={iconStyle}/> Average ACT Score: {ACT_AVG}</Content>
          <Content color={"#30c735"}> <MdMonetizationOn style={iconStyle}/> Average SAT Score: {SAT_AVG_ALL}</Content>
        </Information>
  </Card>
  );
}
