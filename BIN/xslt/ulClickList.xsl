<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" version="1.0" omit-xml-declaration="yes" indent="yes" cdata-section-elements="label caption text txtBlock"/>
   
    <xsl:template match="/">
    	 <list x="40" y="165" height="330">
			<image x="520" y="40" width="400" height="232" class="roundImage">images/placeHolder.jpg</image>
			<audio x="440" y="150">audio/file.mp3</audio>
			<text x="20" y="30" width="440"><![CDATA[<p><span class="boldText">Title</span><br/>
		 Click on each button in the image below to learn more about...</p>
		]]></text>
    		 <xsl:for-each select="tree/button">
               <xsl:call-template name="button"/>
           </xsl:for-each>
    	</list>
	</xsl:template>
	
	<xsl:template name="button">
		<item>
			<caption><xsl:call-template name="buttonLabel"/></caption>
			<image x="520" y="40" width="400" height="232" class="roundImage">images/placeHolder.jpg</image>
			<audio x="940" y="450">audio/<xsl:call-template name="audio"/></audio>
			<text x="480" y="300" width="480" height="155">
				<xsl:call-template name="buttonText"/>
			</text>
 		</item>
	</xsl:template>
	
	<xsl:template name="audio">
		<xsl:variable name="audioFile" select="txtBlock/@narration"/>
		<xsl:value-of select="substring-after($audioFile,'/')"/>
	</xsl:template>
	
	<xsl:template name="buttonLabel">
        <xsl:variable name="fullText" select="label/." />
        <xsl:variable name="afterOpen" select="substring-after($fullText,'&gt;')" />
        <xsl:variable name="beforeClose" select="substring-before($afterOpen,'&lt;')" />
       <xsl:value-of select="$beforeClose"/>
	</xsl:template>
	
	<xsl:template name="buttonText">
		<xsl:variable name="buttonTitle">
			<xsl:call-template name="buttonLabel"/>
		</xsl:variable>
        <xsl:variable name="fullText" select="txtBlock/." /> 
        <xsl:variable name="afterOpen" select="substring-after($fullText,'&lt;/p&gt;')" /> 
        <xsl:variable name="openSpan" select="'&lt;span class=&quot;boldText&quot;&gt;'"/>
        <xsl:variable name="closeSpan" select="'&lt;/span&gt;'"/>
        <xsl:value-of select="concat($openSpan, $buttonTitle, $closeSpan,$afterOpen)" disable-output-escaping="yes"/>      
	</xsl:template>

</xsl:stylesheet>
