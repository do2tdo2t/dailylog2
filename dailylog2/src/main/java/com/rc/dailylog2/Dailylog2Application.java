package com.rc.dailylog2;

import com.samskivert.mustache.Mustache;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.mustache.MustacheEnvironmentCollector;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;

@EnableAutoConfiguration(exclude= {SecurityAutoConfiguration.class})
@SpringBootApplication
public class Dailylog2Application {

	public static void main(String[] args) {
		SpringApplication.run(Dailylog2Application.class, args);
	}

	//Override MustacheAutoConfiguration to support defaultValue("")
	@Bean
	public Mustache.Compiler mustacheCompiler(Mustache.TemplateLoader mustacheTemplateLoader,
											  Environment environment) {

		MustacheEnvironmentCollector collector = new MustacheEnvironmentCollector();
		collector.setEnvironment(environment);

		// default value
		Mustache.Compiler compiler = Mustache.compiler().defaultValue("")
				.withLoader(mustacheTemplateLoader)
				.withCollector(collector);
		return compiler;

	}
}
