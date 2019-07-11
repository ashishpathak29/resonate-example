<?xml version="1.0" encoding="UTF-8"?>

<!--
    Document   : ulQuestionPool.xsl
    Created on : May 6, 2013, 2:28 PM
    Author     : cswenson
    Description:
        Converts a UL formatted quiz to a Resonate Quiz.
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="text"/>
    <xsl:strip-space elements="audio" />
    <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
    <xsl:template match="/">
     <xsl:for-each select="pool/question">
        <xsl:call-template name="question"/>

      </xsl:for-each>
           
     
    </xsl:template>

    <xsl:template name="question">
      <xsl:variable name="audio" select="stem/@audio"/>
       <xsl:call-template name="buildPath">
                  <xsl:with-param name="audio" select="substring-after($audio,'audio/')"/>
                  <xsl:with-param name="suffixLen" select="3"/>
       </xsl:call-template>
              <xsl:text>&#10;</xsl:text>
            <xsl:for-each select="distractor">
              <xsl:choose>
                 <xsl:when test="@audio">
                  <xsl:choose>
                    <xsl:when test="@audio='audio/true.mp3'"/>
                    <xsl:when test="@audio='audio/false.mp3'"/>
                    <xsl:otherwise>
                      <xsl:variable name="audio" select="@audio"/>
                      <xsl:call-template name="buildPath">
                        <xsl:with-param name="audio" select="substring-after($audio,'audio/')"/>
                        <xsl:with-param name="suffixLen" select="5"/>
                      </xsl:call-template>
                       <xsl:text>&#10;</xsl:text>
                    </xsl:otherwise>
                 </xsl:choose>
                 </xsl:when>
              </xsl:choose>
            </xsl:for-each>
            <xsl:for-each select="feedback">
            	<xsl:choose>
	            	<xsl:when test="@audio">
	            		<xsl:variable name="audio" select="@audio"/>
	                     
	                        <xsl:choose>
	                        	<xsl:when test="@correct='true'">
	                        		 <xsl:call-template name="buildPath">
	                        			<xsl:with-param name="audio" select="substring-after($audio,'audio/')"/>
	                        			<xsl:with-param name="suffixLen" select="11"/>
	                        		</xsl:call-template>
	                        	</xsl:when>
	                        	<xsl:when test="@correct='false'">
	                        		 <xsl:call-template name="buildPath">
	                        			<xsl:with-param name="audio" select="substring-after($audio,'audio/')"/>
	                        			<xsl:with-param name="suffixLen" select="13"/>
	                        		</xsl:call-template>
	                        	</xsl:when>
	                        </xsl:choose>
	                      
	                      <xsl:text>&#10;</xsl:text>
	            	</xsl:when>
            	</xsl:choose>
            </xsl:for-each>
            
    </xsl:template>

    <xsl:template name="buildPath">
        <xsl:param name="audio" />
        <xsl:param name="suffixLen" />
        <xsl:variable name="path" select="substring-before($audio,'.mp3')"/>
        <xsl:variable name="shortPath" select="substring($path,1,string-length($path)-$suffixLen)"/>

     
       <xsl:value-of select="$audio"/>
    </xsl:template>



    


</xsl:stylesheet>
