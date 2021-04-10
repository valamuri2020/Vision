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
import { CgNotes } from 'react-icons/cg'

export default function DashboardCard({ college, ...props }) {
  const { DOCUMENT_ID, INSTNM, CITY, ADM_RATE_ALL, STABBR, AVG_COST, SAT_AVG_ALL, INSTURL, ACT_AVG, ADD_NOTES } = college;

  const iconStyle = { fontSize: '24px', margin: '0px 10px' }
  return (
    <Card>
        <Information>
          <Content>
            <h3>{INSTNM}</h3>
          </Content>
          <Content> <HiLocationMarker style={iconStyle}/> {CITY}, {STABBR} </Content>
          <Content> <a href={`/list/${DOCUMENT_ID}`}><FaEdit style={iconStyle}/>Edit this information</a></Content>
        </Information>
        {/* information about the academics focused info */}
        <Information>
          <Content> <SiGooglescholar style={iconStyle}/> Acceptance Rate: {ADM_RATE_ALL * 100}% </Content>
          <Content color={"#46b3e6"}> <MdMonetizationOn style={iconStyle}/> Average Yearly Tuition: ${AVG_COST}</Content>
          <Content color={"#30c735"}> <MdMonetizationOn style={iconStyle}/> Average ACT Score: {ACT_AVG}</Content>
          <Content color={"#30c735"}> <MdMonetizationOn style={iconStyle}/> Average SAT Score: {SAT_AVG_ALL}</Content>
        </Information>
        <Information>
          <Content><CgNotes style={iconStyle}/> {ADD_NOTES ?? `none`} </Content>
        </Information>
  </Card>
  );
}
