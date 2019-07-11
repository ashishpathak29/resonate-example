<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="text"/>
    <xsl:strip-space elements="audio" />
    <xsl:variable name="lowercase" select="'abcdefghijklmnopqrstuvwxyz'" />
    <xsl:variable name="uppercase" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'" />
   
    <xsl:template match="/">
    		 <xsl:for-each select="tree/button/txtBlock ">
    		  	<xsl:value-of select="@narration"/>  
             <xsl:text>&#10;</xsl:text>
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
