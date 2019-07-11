<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" version="1.0" omit-xml-declaration="yes" indent="yes" cdata-section-elements="caption text"/>
   
    <xsl:template match="/">
    	 <list x="40" y="165" height="330">
			<image x="520" y="40" width="400" height="232" class="roundImage">images/placeHolder.jpg</image>
			<audio x="440" y="150">audio/file.mp3</audio>
			<text x="20" y="30" width="440"><![CDATA[<p><span class="boldText">Title</span><br/>
		 Click on each button in the image below to learn more about...</p>
		]]></text>
    		 <xsl:for-each select="INFOTREE/NODE ">
               <xsl:call-template name="button"/>
           </xsl:for-each>
    	</list>
	</xsl:template>
	
	<xsl:template name="button">
		<item>
			<caption><xsl:value-of select="@title"/></caption>
			<image x="520" y="40" width="400" height="232" class="roundImage">images/placeHolder.jpg</image>
			<audio x="940" y="450">audio/<xsl:value-of select="@narration"/></audio>
			<text x="480" y="300" width="480" height="155">
				<xsl:text>&lt;p class="boldText"&gt;</xsl:text><xsl:value-of select="@title"/><xsl:text>&lt;/p&gt;
				&lt;p&gt;</xsl:text><xsl:value-of select="TEXT"/><xsl:text>&lt;/p&gt;</xsl:text>
			</text>
 		</item>
	</xsl:template>
	
	
	
	
	

</xsl:stylesheet>
