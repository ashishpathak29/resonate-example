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
     <xsl:strip-space elements="CHOICE audio" />
    
    <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
    <xsl:template match="/">
       
           <xsl:for-each select="QUIZSHOW/QUESTION">
               <xsl:call-template name="Question"/>
     
           </xsl:for-each>
       
    </xsl:template>

    <xsl:template name="Question"> 
    	<xsl:variable name="audio" select="@narration"/>
    	
    	
    	<xsl:choose>    
            <xsl:when test="@questionType=4">
                <xsl:for-each select="CHOICE">
                <xsl:variable name="text" select="."/>
             	<xsl:variable name="path" select="substring-before($audio,'.mp3')"/>
        		<xsl:variable name="shortPath" select="substring($path,1,string-length($path)-3)"/>

        <xsl:value-of select="translate($shortPath,$uppercase,$lowercase)"/>/<xsl:value-of select="normalize-space($text)"/>
                	<xsl:text>&#10;</xsl:text>
                </xsl:for-each>
            </xsl:when>
         </xsl:choose>
    </xsl:template>
   
   
    <xsl:template name="buildPath">
        <xsl:param name="audioFile" />
        <xsl:param name="suffixLen" />
        <xsl:variable name="path" select="substring-before($audioFile,'.mp3')"/>
        <xsl:variable name="shortPath" select="substring($path,1,string-length($path)-$suffixLen)"/>

        <xsl:value-of select="translate($shortPath,$uppercase,$lowercase)"/>
    </xsl:template>
   
    
</xsl:stylesheet>
