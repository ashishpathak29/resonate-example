<?xml version="1.0" encoding="UTF-8"?>

<!--
    Document   : ulQuestionPool.xsl
    Created on : May 6, 2013, 2:28 PM
    Author     : cswenson
    Description:
        Converts a UL formatted quiz to a Resonate Quiz.
-->

<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="xml" version="1.0" omit-xml-declaration="yes" indent="yes" cdata-section-elements="stem distractor value audio"/>
    <xsl:strip-space elements="CHOICE" />
    <xsl:template match="/">
        <pool>
           <xsl:for-each select="QUIZSHOW/QUESTION">
               <xsl:call-template name="Question"/>
     
           </xsl:for-each>
        </pool>
    </xsl:template>

    <xsl:template name="Question">
        <question>
            
            <xsl:choose>
             <xsl:when test="@questionType=1">
              <xsl:attribute name="type">MC</xsl:attribute>
                <xsl:call-template name="MCQuestion">
                    <xsl:with-param name="correct" select="@answer"/>
                    <xsl:with-param name="audio" select="@narration"/>
                </xsl:call-template>
            </xsl:when>
             <xsl:when test="@questionType=2">
                <xsl:attribute name="type">MC</xsl:attribute>
                <xsl:call-template name="TrueFalse">
                    <xsl:with-param name="correct" select="@answer"/>
                     <xsl:with-param name="audio" select="@narration"/>
                </xsl:call-template>
            </xsl:when>
            <xsl:when test="@questionType=4">
                <xsl:attribute name="type">MCImage</xsl:attribute>
                <xsl:call-template name="MCImageQuestion">
                    <xsl:with-param name="correct" select="@answer"/>
                     <xsl:with-param name="audio" select="@narration"/>
                </xsl:call-template>
            </xsl:when>


            </xsl:choose>
            <xsl:call-template name="Feedback">
            	 <xsl:with-param name="audio" select="@narration"/>
            </xsl:call-template>
            </question>
    </xsl:template>
   
    <xsl:template name="MCQuestion">
        <xsl:param name="correct" />
         <xsl:param name="audio" />
       <stem>
        <xsl:attribute name="audio">audio/<xsl:value-of select="$audio"/></xsl:attribute>
        <xsl:attribute name="audioButtonClass">audioBtn,audioBtnMCStem</xsl:attribute>
        <xsl:value-of select="STEM"/>
        </stem>
        <xsl:for-each select="CHOICE">
            <distractor>
            
            <xsl:if test="position()=$correct">
                    <xsl:attribute name="correct">true</xsl:attribute>
            </xsl:if>


            <xsl:if test="position()=1">
                    <xsl:attribute name="audio">audio/<xsl:value-of select="substring-before($audio,'.mp3')"/>_a.mp3</xsl:attribute>
            </xsl:if>
             <xsl:if test="position()=2">
                    <xsl:attribute name="audio">audio/<xsl:value-of select="substring-before($audio,'.mp3')"/>_b.mp3</xsl:attribute>
            </xsl:if>
             <xsl:if test="position()=3">
                    <xsl:attribute name="audio">audio/<xsl:value-of select="substring-before($audio,'.mp3')"/>_c.mp3</xsl:attribute>
            </xsl:if>
             <xsl:if test="position()=4">
                    <xsl:attribute name="audio">audio/<xsl:value-of select="substring-before($audio,'.mp3')"/>_d.mp3</xsl:attribute>
            </xsl:if>
             <xsl:if test="position()=5">
                    <xsl:attribute name="audio">audio/<xsl:value-of select="substring-before($audio,'.mp3')"/>_e.mp3</xsl:attribute>
            </xsl:if>



            <xsl:value-of select="."/>
            </distractor>
        </xsl:for-each>
    </xsl:template>





    <xsl:template name="TrueFalse">
         <xsl:param name="correct" />
         <xsl:param name="audio" />
        <stem>
        <xsl:attribute name="audio">audio/<xsl:value-of select="$audio"/></xsl:attribute>
        <xsl:attribute name="audioButtonClass">audioBtn,audioBtnMCStem</xsl:attribute>
        <xsl:value-of select="STEM"/>
        </stem>
        <distractor>
        <xsl:if test="$correct=1">
                    <xsl:attribute name="correct">true</xsl:attribute>
        </xsl:if>
        <xsl:attribute name="audio">audio/true.mp3</xsl:attribute>
        True
        </distractor>
        <distractor>
         <xsl:if test="$correct=2">
                    <xsl:attribute name="correct">true</xsl:attribute>
        </xsl:if>
         <xsl:attribute name="audio">audio/false.mp3</xsl:attribute>
        False
        </distractor>
    </xsl:template>

    <xsl:template name="MCImageQuestion">
            <xsl:param name="correct" />
             <xsl:param name="audio" />
             
           <stem>
            <xsl:attribute name="audio">audio/<xsl:value-of select="$audio"/></xsl:attribute>
            <xsl:attribute name="audioButtonClass">audioBtn,audioBtnMCStem</xsl:attribute>
            <xsl:value-of select="STEM"/>
            </stem>
            <xsl:for-each select="CHOICE">
                <distractor>
                
                <xsl:if test="position()=$correct">
                        <xsl:attribute name="correct">true</xsl:attribute>
                </xsl:if>
                <xsl:variable name="text" select="."/>
               
                 <xsl:attribute name="image">images/<xsl:value-of select="normalize-space($text)"/></xsl:attribute>
                </distractor>
            </xsl:for-each>
        </xsl:template>


    <xsl:template name="Feedback">
    	<xsl:param name="audio" />
            <feedback correct="true" attempt="-1">
            	 <xsl:attribute name="audio">audio/<xsl:value-of select="substring-before($audio,'.mp3')"/>_Correct.mp3</xsl:attribute>
                <xsl:attribute name="audioButtonClass">audioBtn,audioBtnFeedback</xsl:attribute>
                <value><xsl:value-of select="CORRECT"/></value>
            </feedback>
            <feedback correct="false" attempt="-1">
            	<xsl:attribute name="audio">audio/<xsl:value-of select="substring-before($audio,'.mp3')"/>_Incorrect.mp3</xsl:attribute>
                <xsl:attribute name="audioButtonClass">audioBtn,audioBtnFeedback</xsl:attribute>

                <value><xsl:value-of select="INCORRECT"/></value>
            </feedback>
    </xsl:template>

<xsl:template name="string-replace-all">
      <xsl:param name="text" />
      <xsl:param name="replace" />
      <xsl:param name="by" />
      <xsl:choose>
        <xsl:when test="contains($text, $replace)">
          <xsl:value-of select="substring-before($text,$replace)" />
          <xsl:value-of select="$by" />
          <xsl:call-template name="string-replace-all">
            <xsl:with-param name="text"
            select="substring-after($text,$replace)" />
            <xsl:with-param name="replace" select="$replace" />
            <xsl:with-param name="by" select="$by" />
          </xsl:call-template>
        </xsl:when>
        <xsl:otherwise>
          <xsl:value-of select="$text" />
        </xsl:otherwise>
      </xsl:choose>
    </xsl:template>




</xsl:stylesheet>
